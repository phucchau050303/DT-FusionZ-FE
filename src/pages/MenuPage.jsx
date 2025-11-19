import React from 'react';
import ProductCard from '../components/products/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MenuPage = () => {
  function handleClickToFoodDetails(){
    window.location.href = '/item-info';
  }

  const sampleProduct = {
    name: "Sample Dish",
    description: "A delicious sample dish to tantalize your taste buds.",
    price: 20,
    image: "https://sudachirecipes.com/wp-content/uploads/2020/04/katsudon-sqr.jpg"
  };

  return (
    <div className="menu-page container">
      <h1 className='text-center'>MENU</h1>

      {Array.from({ length: 3 }).map((_, j) => (
        <React.Fragment key={j}>
          <h2 className='text-center text-uppercase mb-3 mt-4'>rice bowls</h2>
          <hr className='mb-5 d-flex justify-content-center align-items-center'></hr>
            <Row>
                {Array.from({ length: 6 }).map((_, i) => (
                <Col xl={3} md={6} sm={12} className="mb-3 d-flex align-items-center justify-content-center" key={i}>
                  <ProductCard onClick={handleClickToFoodDetails} key={i} product={sampleProduct} />
                </Col>
                ))}
            </Row>

        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuPage;
