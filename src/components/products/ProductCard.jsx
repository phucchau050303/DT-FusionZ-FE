import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card onClick={onClick} className = "border-0 product-card" style={{ width: '18rem'}}>
      <Card.Img className='card-img' variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title className = "text-center title-text text-uppercase">{product.name}</Card.Title>
        <Card.Text  className = "text-center">{product.description}</Card.Text>
        <Card.Text className = "text-center product-price p-0">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 