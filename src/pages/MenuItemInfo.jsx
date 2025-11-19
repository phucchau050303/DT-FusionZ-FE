import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const item = {
    name: "Tonkatsu Chicken",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    price: 20,
    image: "https://sudachirecipes.com/wp-content/uploads/2020/04/katsudon-sqr.jpg"
};


const MenuItemInfo = () => {
    return(
        <div className="container mt-5 menu-item-info">
            <Row>
                <Col xl={6}>
                    <div className="d-flex align-items-center justify-content-center">
                    <img src={item.image} alt={item.name} className="img-item-info " />
                    </div>

                </Col>
                <Col xl={6} className="d-flex flex-column align-items-center ">
                    <div className = "mt-4 price-box p-5 text-center">
                        <h2 className="text-uppercase">{item.name}</h2>
                        <span className="price-text">${item.price}</span>
                        <h4 style={{color: '#6C6C6C'}} className="text-uppercase">Call 0396893300 to order</h4>
                    </div>
                </Col>
            </Row>
            <div className="mt-5">
                <h1>DESCRIPTION</h1>
                <p className="description-text">{item.description}</p>
            </div>

            <div className="mt-5">
                <h1>EXTRA</h1>

            </div>
        </div>
    );
};

export default MenuItemInfo;