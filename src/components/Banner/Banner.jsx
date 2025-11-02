import React from 'react';

const Banner = () => {
  return (
    <div className="hero bg-base-200 py-16">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold">
            Deal your Products <br /> in a{' '}
            <span className="text-primary">Smart way!</span>
          </h1>
          <p className="py-4 text-gray-600 text-lg">
            SmartDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </p>

          {/* 🔍 Search Bar */}
          <div className="join w-full max-w-xl mx-auto my-6">
            <input
              type="text"
              placeholder="Search for Products, Categories..."
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item px-6">Search</button>
          </div>

          {/* 🧩 Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            <button className="btn btn-primary bg-gradient-to-r from-[#632EE3] to-[#9F62F2] border-0 text-white">
              Watch All Products
            </button>
            <button className="btn btn-outline btn-primary border-2 border-[#632EE3] text-[#632EE3] hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:text-white">
              Post a Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
