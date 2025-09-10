import React from 'react';
import Carousel from '../components/image/carousel';
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
          { src: "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg", alt: "Delicious Dish 1" },
          { src: "https://www.medibank.com.au/content/dam/livebetter/en/images/eat/GettyImages-2182151106.jpg", alt: "Delicious Dish 2" },
          { src: "https://www.orchardhotel.com.au/wp-content/uploads/2024/10/The-Orchard-Hotel-Chatswood-Restaurant-Bar-48.jpg", alt: "Delicious Dish 3" },
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
