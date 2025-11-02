import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  // const { _id: productId } = useLoaderData();

  const product = useLoaderData();
  const productId = product._id;
  // console.log(product);

  const [bids, setBids] = useState([]);

  // ❌ modal
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);

  // bid history
  useEffect(() => {
    fetch(`http://localhost:5000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('bids for this product', data);
        setBids(data);
      });
  }, [productId]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // const image = e.target.image.value;
    const price = e.target.price.value;
    console.log(productId, name, email, price);

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bit_price: price,
      status: 'pending',
    };

    fetch('http://localhost:5000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('after placing bid', data);
        if (data.insertedId) {
          bidModalRef.current.close();

          // sweet alert2
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });

          // add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bit_price - a.bit_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        {/* Product Image */}
        <div className="mb-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Title */}
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        {/* Price */}
        <p className="text-green-600 text-xl font-semibold mb-4">
          ${product.price_min} - ${product.price_max}
        </p>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Product Details</h2>
        <p>
          <strong>Condition:</strong> {product.condition}
        </p>
        <p>
          <strong>Usage:</strong> {product.usage}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Location:</strong> {product.location}
        </p>
        <p>
          <strong>Posted on:</strong>{' '}
          {new Date(product.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {product.status}
        </p>
      </div>

      {/* Seller Information */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Seller Information</h2>
        <div className="flex items-center mb-2">
          <img
            src={product.seller_image}
            alt={product.seller_name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="font-bold">{product.seller_name}</p>
            <p>{product.seller_contact}</p>
            <p>{product.email}</p>
          </div>
        </div>
      </div>

      {/* Buy Button & ❌❌ Open the modal  */}
      <div>
        <button
          onClick={handleBidModalOpen}
          className="w-full py-3 btn btn-primary"
        >
          I Want Buy This Product
        </button>
        {/* ❌❌ Open the modal */}

        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Give Seller Your Offered Price
            </h3>
            {/* ♦️form -- start♦️ */}
            <form onSubmit={handleBidSubmit} className="card-body">
              <fieldset className="fieldset ">
                {/* name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  readOnly
                  defaultValue={user?.displayName || ''}
                />
                {/* email */}
                <label className="label">email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  readOnly
                  defaultValue={user?.email || ''}
                />

                {/* Place price */}
                <label className="label">Bid </label>
                <input
                  type="text"
                  name="price"
                  className="input"
                  placeholder="e.g. bid"
                />

                {/* Contact info */}
                <label className="label">Contact Info</label>
                <input
                  type="text"
                  name="contact"
                  className="input"
                  placeholder="e.g. +1-555-1234"
                />
              </fieldset>
              <button className="btn btn-primary">Please your bid</button>
            </form>
            {/* ♦️♦️♦️ */}
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* bid for this product */}

      <div>
        <h3 className="text-3xl">
          Bids for this product:{' '}
          <span className="text-purple-500">{bids.length}</span>
        </h3>
        {/* 🔰 table from daisyUI */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bit_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
