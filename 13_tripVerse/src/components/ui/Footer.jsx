import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconCompass } from "./Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom pt-5 pb-4 mt-auto">
      <Container>
        <Row className="gy-4 mb-5">
          {/* Brand Info */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="p-2 rounded-circle" style={{ backgroundColor: "var(--brand-accent)" }}>
                <IconCompass size={22} className="text-white" />
              </span>
              <span className="h4 fw-bold mb-0 text-white tracking-tight">TripVerse</span>
            </div>
            <p className="text-muted small mb-4 pe-lg-4" style={{ lineHeight: 1.7 }}>
              TripVerse is your trusted curated travel companion. Discover extraordinary journeys,
              transparent itineraries, and seamless booking experiences worldwide.
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge rounded-pill bg-dark border border-secondary text-light px-3 py-2 small">
                Curated Travel Platform
              </span>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} sm={6} xs={6}>
            <h6 className="text-white fw-bold text-uppercase small mb-3 letter-spacing-1">
              Explore
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/trips" className="footer-link">All Trips</Link>
              </li>
              <li>
                <Link to="/trips?category=Beach+Escapes" className="footer-link">Beach Escapes</Link>
              </li>
              <li>
                <Link to="/trips?category=Adventure+Trips" className="footer-link">Adventure Trips</Link>
              </li>
              <li>
                <Link to="/trips?category=Cultural+Experiences" className="footer-link">Cultural Tours</Link>
              </li>
              <li>
                <Link to="/wishlist" className="footer-link">My Wishlist</Link>
              </li>
            </ul>
          </Col>

          {/* Popular Destinations */}
          <Col lg={3} sm={6} xs={6}>
            <h6 className="text-white fw-bold text-uppercase small mb-3 letter-spacing-1">
              Top Destinations
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/trips/1" className="footer-link">Paris, France</Link>
              </li>
              <li>
                <Link to="/trips/2" className="footer-link">Bali, Indonesia</Link>
              </li>
              <li>
                <Link to="/trips/4" className="footer-link">Zermatt, Switzerland</Link>
              </li>
              <li>
                <Link to="/trips/5" className="footer-link">Tokyo, Japan</Link>
              </li>
              <li>
                <Link to="/trips/7" className="footer-link">Santorini, Greece</Link>
              </li>
              <li>
                <Link to="/trips/11" className="footer-link">Tromsø, Norway</Link>
              </li>
            </ul>
          </Col>

          {/* Booking & Support */}
          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold text-uppercase small mb-3 letter-spacing-1">
              Traveler Support
            </h6>
            <p className="text-muted small mb-3">
              Need assistance with your booking or have inquiries about our curated itineraries?
            </p>
            <div className="p-3 rounded-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div className="small text-white fw-medium mb-1">Online Support</div>
              <div className="small text-muted mb-2">Available Mon – Sat, 9:00 AM – 7:00 PM</div>
              <Link to="/trips" className="btn btn-sm btn-brand-accent w-100 rounded-pill">
                Browse Packages
              </Link>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 small text-muted">
          <div>
            &copy; {currentYear} TripVerse. All rights reserved. Curated for exploratory journeys.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">Built with React &amp; Firebase</span>
            <span>•</span>
            <Link to="/trips" className="footer-link">Discover Journeys</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
