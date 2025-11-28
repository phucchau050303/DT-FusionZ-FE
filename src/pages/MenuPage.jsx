import React, { useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const MenuPage = () => {


  const[categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  function handleClickToFoodDetails(itemId){
    window.location.href = `/item-info/${itemId}`;
  }

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('api/menu/categories');
        if(!mounted) return;

        setCategories(response.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        if(!mounted) return;
        setError(err.message || 'Error fetching categories');
      } finally {
        if(!mounted)
        setLoading(false);
      }
    };

    fetchCategories();
    return () => { mounted = false;};
  }, []);


  const getImageUrl = (url) => {
    if (!url) return '/VeganBento.png'; // fallback
    if (url.startsWith('http') || url.startsWith('https')) return url;
    // If imageUrl is stored as /images/foo.png or relative path, prepend backend base if needed.
    // If you keep images in blob storage or full URLs in the DB, this won't be necessary.
    return url;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error.message || 'An error occurred while loading the menu.'}
      </div>
    );
  }

  return (
    <div className="menu-page container">
      <h1 className='text-center'>MENU</h1>

      {categories.length === 0 && (
        <p className="text-center mt-4">No categories found.</p>
      )}

      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <h2 className='text-center text-uppercase mb-3 mt-4'>{category.name}</h2>
          <hr className='mb-5 d-flex justify-content-center align-items-center'></hr>
            <Row>
            {(category.items || []).map((item) => (
              <Col
                xl={3}
                md={6}
                sm={12}
                className="mb-3 d-flex align-items-center justify-content-center"
                key={item.id}
              >
                <ProductCard
                  onClick={() => handleClickToFoodDetails(item.id)}
                  product={{
                    name: item.name ?? 'Unnamed',
                    description: item.shortDescription ?? item.description ?? '',
                    price: item.price ?? 0,
                    image: getImageUrl(item.imageUrl),
                    id: item.id,
                  }}
                />
              </Col>
            ))}
            </Row>

        </React.Fragment>
      ))}


    </div>
  );
};

export default MenuPage;
