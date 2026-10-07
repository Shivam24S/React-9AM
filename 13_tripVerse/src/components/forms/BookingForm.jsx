import { useNavigate, useParams } from "react-router-dom";
import { trips } from "../../data/Trips";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    person: "",
    total: "",
  });

  const { id } = useParams();

  const selectedTrip = trips.find((t) => t.id === Number(id));

  const navigate = useNavigate();

  const { user } = useContext(authContext);

  const handleChange = (field, e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        total: selectedTrip.price * formData.person,
      };
    });
  }, [formData.person, selectedTrip]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("formData", formData);
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="mt-5">
          <Card className="shadow rounded-5">
            <Card.Img
              variant="top"
              className="rounded-5 img-fluid"
              style={{ maxHeight: "400px" }}
              src={selectedTrip.image}
            />
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title className="fs-3">{selectedTrip.name} </Card.Title>
              <Card.Text>{selectedTrip.duration}</Card.Text>
              <Badge bg="success">
                {" "}
                <h3> ₹ {selectedTrip.price}</h3>{" "}
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="mt-5">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Traveler Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Travel Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>No of Person</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.person}
                        onChange={(e) => handleChange("person", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Grand Total</Form.Label>
                      <Form.Control value={formData.total} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 mt-4">
                  <Button onClick={() => navigate(-1)}>Back to Trips</Button>
                  <Button variant="primary" type="submit">
                    Confirm Booking
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
