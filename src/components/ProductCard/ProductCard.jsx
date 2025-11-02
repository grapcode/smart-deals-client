import React from 'react';
import { NavLink } from 'react-router';

const ProductCard = ({ product }) => {
  const { image, title, price_min, _id } = product;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
      <figure className="px-6 pt-6">
        <img
          src={image}
          alt={title}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-primary font-medium">
          $ {price_min.toLocaleString()}
        </p>

        <div className="card-actions mt-3">
          <NavLink
            to={`/productDetails/${_id}`}
            className="btn btn-primary w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] border-0 text-white"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
