import React, { use } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  //   console.log(products);
  return (
    <div>
      <h3>Latest Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
