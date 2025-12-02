import React from 'react';
import Carousel from '../components/image/Carousel';
import ProductCategoryLayout from '../layouts/ProductCategoryLayout';

// const Homepage = () => (
//   <div className="homepage">
//     <NavBar />
//     <h1>Welcome to FusionZ Restaurant</h1>
//     <p>Discover our delicious menu and enjoy a great dining experience!</p>
//   </div>
// );


function WhatWeOffer() {
  return (
    <div>
      
    </div>
  )
};


function Homepage() {
  return (
    <div>
      <div className = "container-fluid p-0">
        <Carousel images={[
          { src: "https://dtfusionzstorage.blob.core.windows.net/menu-images/dtfusionzstore.png", alt: "Delicious Dish 1" },
      ]} />
      </div>
      <div className = "container mt-5 mb-5">
        <p className = "text-center mt-5 fs-3 mb-5">
          Keen to Order? Visit our menu categories!
        </p>

        <div className = "mt-4">
          <ProductCategoryLayout class = "mt-4" onCategoryClick={(category) => {
            console.log('Category clicked:', category);
            // Here you can add navigation logic to go to the category page
          }} />
        </div>
      </div>

    </div>
  );
}

export default Homepage;
