
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/carousel.css';

const MyCarousel = ({ images }) => (
  <Carousel>
    {images.map((img, idx) => (
      <Carousel.Item key={idx}>
        <img className="d-block w-100 carousel-img" src={img.src} alt={img.alt} />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default MyCarousel;