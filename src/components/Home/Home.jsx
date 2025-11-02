import React, { Suspense } from 'react';
import Banner from '../Banner/Banner';
import LatestProducts from '../LatestProducts/LatestProducts';
import MyLoading from '../../My/MyLoading';

const latestProductsPromise = fetch(
  'http://localhost:5000/latest-products'
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <h2 className=" bg-primary text-purple-500">Home page</h2>
      <Suspense fallback={<MyLoading />}>
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
