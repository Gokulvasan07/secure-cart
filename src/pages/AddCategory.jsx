import React from 'react'
import { Container,Card } from 'react-bootstrap'

const AddCategory = () => {
  return (
    <Container>
        <Card>
            <Card.Header>
              <h4>Add Category</h4>
            </Card.Header>
            <Card.Body >
                <form className="mb-2">
                  <div className="form-group mb-2">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Category Link</label>
                    <input
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Category
                  </button>
                </form>
              </Card.Body>
        </Card>
    </Container>
  )
}

export default AddCategory;