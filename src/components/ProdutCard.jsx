import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Container } from "react-bootstrap";

const ProductCard = ({ image, title, price }) => {
  return (  
    <Col className="my-3" sm={6} md={4} lg={3} >
      <Container className="">
        <Card className="hvr-bob" style={{ width: "20rem" }}>
          <Card.Img width="250px" variant="top" src={image} alt={title} />
          <Card.Body>
            <Card.Title><h6>{title}</h6></Card.Title>
            <Card.Text>Price: ${price}</Card.Text>
            <Button className="hvr-radial-out" color="primary" variant="light">Add to cart</Button>
          </Card.Body>
        </Card>
      </Container>
    </Col>

  );
};

export default ProductCard;
