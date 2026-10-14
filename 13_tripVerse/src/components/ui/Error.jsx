import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error = ({ title = "Page Not Found", message }) => {
  const navigate = useNavigate();

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center text-center">
        <Col xs={12} md={8} lg={6}>
          <div className="mb-4">
            <span
              className="badge px-3 py-2 rounded-pill mb-3"
              style={{
                backgroundColor: "rgba(225, 29, 72, 0.1)",
                color: "#e11d48",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              404 • Destination Unknown
            </span>

            <h1
              className="fw-bolder"
              style={{
                fontSize: "clamp(4rem, 10vw, 7.5rem)",
                lineHeight: "1",
                letterSpacing: "-0.04em",
                color: "var(--brand-primary, #0f172a)",
              }}
            >
              404
            </h1>

            <div
              style={{
                width: "60px",
                height: "4px",
                backgroundColor: "var(--brand-accent, #f97316)",
                margin: "1.25rem auto",
                borderRadius: "999px",
              }}
            />
          </div>

          <h2 className="fw-bold mb-3" style={{ color: "var(--text-primary, #0f172a)" }}>
            {title}
          </h2>

          <p className="text-muted mb-4 lead fs-6 mx-auto" style={{ maxWidth: "480px" }}>
            {message ||
              "The expedition you're looking for seems to have vanished from the map, or may have embarked on a different route."}
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="outline-secondary"
              className="px-4 py-2 rounded-pill fw-medium"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </Button>

            <Button
              variant="primary"
              className="px-4 py-2 rounded-pill fw-medium"
              onClick={() => navigate("/trips")}
              style={{
                backgroundColor: "var(--brand-primary, #0f172a)",
                borderColor: "var(--brand-primary, #0f172a)",
              }}
            >
              Explore All Trips
            </Button>

            <Button
              variant="outline-dark"
              className="px-4 py-2 rounded-pill fw-medium"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;