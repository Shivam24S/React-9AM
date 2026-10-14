import { Spinner, Container } from "react-bootstrap";

const Loading = ({
  message = "Loading...",
  subMessage = "Please wait while we load the page",
  fullScreen = true,
}) => {
  return (
    <Container
      fluid
      className={`d-flex flex-column justify-content-center align-items-center ${
        fullScreen ? "min-vh-100" : "py-5"
      }`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{
          width: "68px",
          height: "68px",
          borderRadius: "50%",
          background: "var(--brand-primary-light, rgba(14, 165, 233, 0.12))",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "38px",
            height: "38px",
            borderWidth: "3px",
            color: "var(--brand-primary, #0284c7)",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

      <h5 className="fw-semibold mb-1 text-center" style={{ color: "var(--text-primary, #1e293b)" }}>
        {message}
      </h5>

      {subMessage && (
        <p className="text-muted small text-center mb-0">
          {subMessage}
        </p>
      )}
    </Container>
  );
};

export default Loading;