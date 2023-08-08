import React from "react";
import { Card, Button, Container } from "react-bootstrap";

const ViewCategory = () => {
  return (
    <Container>
      <Card>
        <Card.Header>
          <h4>View Category</h4>
        </Card.Header>
        <Card.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Foods</td>
                <td>Foods</td>
                <td>
                  <Button className="m-1" variant="primary">
                    Edit
                  </Button>
                  <Button className="m-1" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Snacks</td>
                <td>Snacks Description</td>
                <td>
                  <Button className="m-1" variant="primary">
                    Edit
                  </Button>
                  <Button className="m-1" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Category 3</td>
                <td>Category 3 Description</td>
                <td>
                  <Button className="m-1" variant="primary">
                    Edit
                  </Button>
                  <Button className="m-1" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewCategory;
