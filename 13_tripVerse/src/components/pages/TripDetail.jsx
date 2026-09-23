import { trips } from "../../data/Trips";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, ListGroup } from "react-bootstrap";

const TripDetail = () => {
    const { id } = useParams();

    const trip = trips.find((t) => t.id === Number(id));

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Card className="shadow rounded-5">
                            <img
                                src={trip.image}
                                className="rounded-5"
                                alt={trip.name}
                                style={{ height: "450px", width: "100%", objectFit: "cover" }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <h2 className="mt-3">{trip.name}</h2>
                        <h6 className="text-secondary">{trip.destination}</h6>

                        <div className="d-flex gap-2">
                            <Badge bg="primary">{trip.duration}</Badge>
                            <Badge bg="secondary">⭐{trip.rating}</Badge>
                            <Badge bg="info">{trip.difficulty}</Badge>
                            <Badge bg="success">₹{trip.price}</Badge>
                        </div>

                        <Row>
                            <Col className="mt-3">
                                <Card className="shadow p-3">
                                    <h5>Overview</h5>
                                    <h6>{trip.overview}</h6>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="mt-3">
                                <Card className="shadow p-3">
                                    <h5>Trip Highlights</h5>
                                    <ListGroup variant="flush" className="mt-2">
                                        {trip.highlights.map((t) => {
                                            return (
                                                <>
                                                    <ListGroup.Item>{t}</ListGroup.Item>
                                                </>
                                            )

                                        })}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default TripDetail;
