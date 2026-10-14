import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Accordion } from "react-bootstrap";
import { trips } from "../../data/Trips";
import Breadcrumbs from "../ui/Breadcrumbs";
import TripCard from "../ui/TripCard";
import {
  IconMapPin,
  IconClock,
  IconStar,
  IconCheck,
  IconX,
  IconHeart,
  IconCalendar,
  IconUsers,
  IconShieldCheck,
  IconArrowLeft,
} from "../ui/Icons";
import { useWishlist } from "../../context/useWishlist";
import { recordTripView } from "../../utils/recentlyViewed";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find trip safely
  const trip = trips.find((t) => t.id === Number(id));

  // State for traveler counter in booking panel
  const [travelers, setTravelers] = useState(1);
  // Optional selected gallery image override
  const [selectedImage, setSelectedImage] = useState(null);

  // Track recently viewed trip and scroll to top
  useEffect(() => {
    if (trip) {
      recordTripView(trip.id);
      window.scrollTo(0, 0);
    }
  }, [trip]);

  // Handle Invalid Trip ID Gracefully
  if (!trip) {
    return (
      <Container className="py-5 text-center min-vh-50 d-flex flex-column align-items-center justify-content-center">
        <div className="p-5 rounded-4 border bg-surface shadow-sm my-5" style={{ maxWidth: "560px", backgroundColor: "var(--bg-surface)" }}>
          <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill mb-3 fw-bold">
            Journey Not Found
          </span>
          <h2 className="fw-bold mb-3">Expedition Uncharted</h2>
          <p className="text-muted small mb-4">
            The trip reference #{id} does not match any current curated package in the TripVerse catalog. It may have been archived or reassigned.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
            <Link to="/trips" className="btn btn-brand-primary px-4 py-2">
              Browse All Trips
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const isFavorite = isInWishlist(trip.id);
  const gallery = Array.isArray(trip.gallery) && trip.gallery.length > 0 ? trip.gallery : [trip.image];
  const activeImage = selectedImage && gallery.includes(selectedImage) ? selectedImage : (trip.image || FALLBACK_IMAGE);
  const totalPrice = trip.price * travelers;

  // Related trips: same category or other featured trips, excluding current
  const relatedTrips = trips
    .filter((t) => t.id !== trip.id && (t.category === trip.category || t.featured))
    .slice(0, 3);

  const handleBookingClick = () => {
    navigate(`/booking/${trip.id}?travelers=${travelers}`);
  };

  return (
    <div className="py-4 py-lg-5">
      <Container>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Trips", to: "/trips" },
            { label: trip.name },
          ]}
        />

        {/* ===================================================================
            Hero Gallery Section
            =================================================================== */}
        <div className="mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                {trip.category && (
                  <Badge bg="primary-subtle" className="text-primary-emphasis px-3 py-2 rounded-pill fw-semibold">
                    {trip.category}
                  </Badge>
                )}
                <span className="d-flex align-items-center gap-1 text-muted small fw-medium">
                  <IconMapPin size={16} className="text-secondary" />
                  {trip.destination}
                </span>
              </div>
              <h1 className="fw-bolder mb-1 tracking-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)" }}>
                {trip.name}
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className={`btn btn-brand-outline d-flex align-items-center gap-2 ${
                  isFavorite ? "text-danger border-danger" : ""
                }`}
                onClick={() => toggleWishlist(trip.id)}
                aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
              >
                <IconHeart size={18} filled={isFavorite} />
                <span>{isFavorite ? "Saved" : "Save to Wishlist"}</span>
              </button>
            </div>
          </div>

          {/* Main Hero Photo Container */}
          <div
            className="rounded-4 overflow-hidden position-relative shadow-sm mb-3"
            style={{ height: "clamp(300px, 50vh, 520px)", backgroundColor: "var(--bg-surface-subtle)" }}
          >
            <img
              src={activeImage}
              alt={trip.name}
              className="w-100 h-100 object-fit-cover"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
          </div>

          {/* Thumbnail Gallery Strip */}
          {gallery.length > 1 && (
            <Row className="g-2 g-md-3">
              {gallery.map((imgUrl, idx) => {
                const isActive = activeImage === imgUrl;
                return (
                  <Col xs={3} key={`thumb-${idx}`}>
                    <div
                      className={`rounded-3 overflow-hidden border-2 cursor-pointer ${
                        isActive ? "border-primary shadow-sm" : "opacity-75 border-transparent"
                      }`}
                      style={{
                        height: "80px",
                        border: isActive ? "3px solid var(--brand-accent)" : "1px solid var(--border-subtle)",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImage(imgUrl)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSelectedImage(imgUrl);
                      }}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${trip.name} view ${idx + 1}`}
                        className="w-100 h-100 object-fit-cover"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>

        {/* ===================================================================
            Content & Sticky Booking Panel
            =================================================================== */}
        <Row className="gy-4">
          {/* Main Column */}
          <Col lg={8}>
            {/* Quick Metrics Bar */}
            <div className="card p-3 p-md-4 border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              <Row className="g-3 text-center text-sm-start align-items-center">
                <Col sm={3} xs={6} className="border-end-sm">
                  <span className="text-muted small d-block mb-1">Duration</span>
                  <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-1 fw-bold">
                    <IconClock size={16} className="text-primary" />
                    <span>{trip.duration}</span>
                  </div>
                </Col>

                <Col sm={3} xs={6} className="border-end-sm">
                  <span className="text-muted small d-block mb-1">Difficulty</span>
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-1 fw-semibold">
                    {trip.difficulty}
                  </span>
                </Col>

                <Col sm={3} xs={6} className="border-end-sm">
                  <span className="text-muted small d-block mb-1">Rating</span>
                  <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-1 fw-bold">
                    <IconStar size={16} />
                    <span>{trip.rating}</span>
                    <span className="text-muted fw-normal small">({trip.reviewsCount || 100}+)</span>
                  </div>
                </Col>

                <Col sm={3} xs={6}>
                  <span className="text-muted small d-block mb-1">Price per person</span>
                  <span className="fw-bolder fs-5" style={{ color: "var(--brand-accent)" }}>
                    ₹{trip.price.toLocaleString("en-IN")}
                  </span>
                </Col>
              </Row>
            </div>

            {/* Overview */}
            <div className="card p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              <h3 className="h5 fw-bold mb-3">Trip Overview</h3>
              <p className="text-secondary mb-0" style={{ lineHeight: 1.8 }}>
                {trip.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="card p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              <h3 className="h5 fw-bold mb-3">Key Highlights</h3>
              <Row xs={1} md={2} className="g-3">
                {trip.highlights.map((item, idx) => (
                  <Col key={`hl-${idx}`}>
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="p-1 rounded-circle flex-shrink-0 mt-1"
                        style={{ backgroundColor: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
                      >
                        <IconCheck size={14} />
                      </span>
                      <span className="small text-secondary fw-medium">{item}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Day-by-day Itinerary */}
            <div className="card p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="h5 fw-bold mb-0">Day-by-Day Itinerary</h3>
                <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill small">
                  {trip.itinerary.length} Days Planned
                </span>
              </div>

              <Accordion defaultActiveKey="0" flush>
                {trip.itinerary.map((dayItem, idx) => (
                  <Accordion.Item eventKey={String(idx)} key={`itinerary-${dayItem.day || idx}`}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge rounded-pill bg-dark text-white px-2 py-1 small">
                          Day {dayItem.day}
                        </span>
                        <span className="fw-semibold">{dayItem.title}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="text-secondary small" style={{ lineHeight: 1.7 }}>
                      {dayItem.description}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>

            {/* Inclusions & Exclusions */}
            <Row className="g-4 mb-4">
              <Col md={6}>
                <div className="card p-4 border-0 shadow-sm h-100" style={{ backgroundColor: "var(--bg-surface)" }}>
                  <h4 className="h6 fw-bold mb-3 text-success d-flex align-items-center gap-2">
                    <IconCheck size={18} /> Inclusions
                  </h4>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {trip.inclusions.map((item, idx) => (
                      <li key={`inc-${idx}`} className="small text-secondary d-flex align-items-center gap-2">
                        <span className="text-success fw-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>

              <Col md={6}>
                <div className="card p-4 border-0 shadow-sm h-100" style={{ backgroundColor: "var(--bg-surface)" }}>
                  <h4 className="h6 fw-bold mb-3 text-danger d-flex align-items-center gap-2">
                    <IconX size={18} /> Exclusions
                  </h4>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {trip.exclusions.map((item, idx) => (
                      <li key={`exc-${idx}`} className="small text-secondary d-flex align-items-center gap-2">
                        <span className="text-danger fw-bold">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>

            {/* Best Time to Visit & Advisory */}
            <div className="card p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              <h4 className="h6 fw-bold mb-2 d-flex align-items-center gap-2">
                <IconCalendar size={18} className="text-primary" /> Recommended Travel Period
              </h4>
              <p className="text-secondary small mb-3">
                {trip.bestTimeToVisit}
              </p>
              <div className="p-3 rounded-3 bg-body-tertiary border d-flex align-items-start gap-2">
                <IconShieldCheck size={20} className="text-primary flex-shrink-0 mt-1" />
                <span className="small text-muted">
                  TripVerse travelers receive 24/7 on-ground assistance and flexible date reschedule options up to 14 days prior to departure.
                </span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4"
              onClick={() => navigate("/trips")}
            >
              <IconArrowLeft size={16} /> Back to Catalog
            </button>
          </Col>

          {/* Sticky Booking Sidebar Column */}
          <Col lg={4}>
            <div className="sticky-booking-card">
              <Card className="p-4 border-0 shadow-lg" style={{ backgroundColor: "var(--bg-surface)" }}>
                <div className="d-flex align-items-baseline justify-content-between mb-3 border-bottom pb-3">
                  <div>
                    <span className="text-muted small d-block">Price per adult</span>
                    <span className="h3 fw-bold mb-0" style={{ color: "var(--brand-accent)" }}>
                      ₹{trip.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-1">
                    Instant Booking
                  </span>
                </div>

                {/* Traveler Counter */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary mb-2 d-flex align-items-center gap-1">
                    <IconUsers size={16} /> Number of Travelers
                  </label>
                  <div className="d-flex align-items-center justify-content-between p-2 rounded-3 border">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border px-3 fw-bold"
                      onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                      disabled={travelers <= 1}
                      aria-label="Decrease traveler count"
                    >
                      -
                    </button>
                    <span className="fw-bold px-3">
                      {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border px-3 fw-bold"
                      onClick={() => setTravelers((prev) => Math.min(10, prev + 1))}
                      disabled={travelers >= 10}
                      aria-label="Increase traveler count"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Live Dynamic Calculation Summary */}
                <div className="p-3 rounded-3 bg-body-tertiary mb-4 small">
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>Base package ({travelers} × ₹{trip.price.toLocaleString("en-IN")})</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Taxes &amp; Service Charges</span>
                    <span className="text-success">Included</span>
                  </div>
                  <div className="border-top pt-2 d-flex justify-content-between fw-bold text-dark fs-6">
                    <span>Total Estimate</span>
                    <span style={{ color: "var(--brand-accent)" }}>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Reserve Action Button */}
                <button
                  type="button"
                  className="btn btn-brand-accent w-100 py-3 fw-bold mb-3 shadow-sm"
                  onClick={handleBookingClick}
                >
                  Reserve This Journey
                </button>

                <p className="text-muted small text-center mb-0" style={{ fontSize: "0.8rem" }}>
                  🔒 Secure checkout • Authenticated traveler protection
                </p>
              </Card>
            </div>
          </Col>
        </Row>

        {/* ===================================================================
            Related Trips Section
            =================================================================== */}
        {relatedTrips.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h3 className="h4 fw-bold mb-1">You Might Also Like</h3>
                <p className="text-muted small mb-0">
                  Alternative journeys in the {trip.category || "curated"} style.
                </p>
              </div>
              <Link to="/trips" className="small fw-semibold text-decoration-none" style={{ color: "var(--brand-accent)" }}>
                View all packages →
              </Link>
            </div>

            <Row xs={1} sm={2} lg={3} className="g-4">
              {relatedTrips.map((relTrip) => (
                <Col key={`rel-${relTrip.id}`}>
                  <TripCard trip={relTrip} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TripDetail;
