import React from 'react';
import Card from 'react-bootstrap/Card';
import '../../styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card onClick={onClick} className="border-0 product-card h-100">
      <div className="card-img-wrapper">
        <Card.Img className="card-img" variant="top" src={product.image} alt={product.name} />

      </div>

      <Card.Body className="d-flex flex-column">
        <div className="card-content">
          <Card.Title className="text-center title-text text-uppercase">{product.name}</Card.Title>
          <Card.Text className="text-center">{product.description}</Card.Text>
        </div>

        <div className="product-price">
          ${product.price}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;