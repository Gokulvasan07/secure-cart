import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function ProductAdd() {
  return (
    <Container className="mt-3">
      <Card>
        <Card.Header>
          <h4>Add Product</h4>
        </Card.Header>
        <Card.Body>
          <form className="mb-2">
            <div className="form-group mb-2">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
              />
            </div>
            <div className="form-group mb-2">
              <label>Product Price</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-2">
              <label>Product Image</label>
              <input type="file" className="form-control" />
            </div>
            <div className="form-group mb-2">
              <label>Product Description</label>
              <textarea type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductAdd;
