import { useState, useMemo } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Alert, Spinner, Modal } from "react-bootstrap";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { trips } from "../../data/Trips";
import { useAuth } from "../../context/useAuth";
import Breadcrumbs from "../ui/Breadcrumbs";
import {
  IconMapPin,
  IconClock,
  IconCheck,
  IconShieldCheck,
  IconUsers,
} from "../ui/Icons";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg";

const BookingForm = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const selectedTrip = trips.find((t) => t.id === Number(id));

  // Default traveler count from URL parameter or 1
  const initialTravelers = Math.max(1, Math.min(20, Number(searchParams.get("travelers")) || 1));

  // Today's date string YYYY-MM-DD for min date attribute
  const todayStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Earliest travel date: tomorrow
    return d.toISOString().split("T")[0];
  }, []);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    date: todayStr,
    person: initialTravelers,
    request: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedBookingId, setConfirmedBookingId] = useState(null);

  // Derived price calculation (No setState in useEffect)
  const pricePerPerson = selectedTrip ? selectedTrip.price : 0;
  const numberOfPeople = Math.max(1, Number(formData.person) || 1);
  const grandTotal = pricePerPerson * numberOfPeople;

  // Handle Invalid Trip Route Safely
  if (!selectedTrip) {
    return (
      <Container className="py-5 text-center">
        <div className="p-5 rounded-4 border bg-surface shadow-sm mx-auto" style={{ maxWidth: "540px", backgroundColor: "var(--bg-surface)" }}>
          <h3 className="fw-bold mb-2">Package Not Found</h3>
          <p className="text-muted small mb-4">
            The itinerary you're attempting to reserve does not exist in our catalog.
          </p>
          <Link to="/trips" className="btn btn-brand-primary px-4 py-2">
            Browse Available Trips
          </Link>
        </div>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "person" ? Math.max(1, Math.min(20, Number(value) || 1)) : value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return "Please enter a valid traveler full name (at least 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid contact email address.";
    }
    const cleanPhone = formData.phone.replace(/[\s()-]/g, "");
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
      return "Please provide a valid phone number (7 to 15 digits).";
    }
    if (!formData.date) {
      return "Please select a travel date.";
    }
    if (new Date(formData.date) < new Date(todayStr)) {
      return "Travel date must be scheduled from tomorrow onwards.";
    }
    if (numberOfPeople < 1 || numberOfPeople > 20) {
      return "Number of travelers must be between 1 and 20.";
    }
    if (formData.request.length > 500) {
      return "Special requests cannot exceed 500 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    if (!user) {
      setErrorMsg("Please sign in before completing your reservation.");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        userId: user.uid,
        travelerName: formData.name.trim(),
        name: formData.name.trim(), // backward compat
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        travelDate: formData.date,
        date: formData.date, // backward compat
        numberOfPeople: numberOfPeople,
        person: numberOfPeople, // backward compat
        pricePerPerson: pricePerPerson,
        tripPrice: pricePerPerson, // backward compat
        totalPrice: grandTotal,
        total: grandTotal, // backward compat
        specialRequests: formData.request.trim(),
        request: formData.request.trim(), // backward compat
        tripId: selectedTrip.id,
        tripName: selectedTrip.name,
        tripImage: selectedTrip.image,
        image: selectedTrip.image, // backward compat
        tripDestination: selectedTrip.destination,
        tripDuration: selectedTrip.duration,
        status: "Confirmed",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingPayload);
      setConfirmedBookingId(docRef.id);
    } catch (err) {
      console.error("Firestore booking error:", err);
      setErrorMsg(
        "We could not record your booking due to a network or database issue. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4 py-lg-5">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Trips", to: "/trips" },
            { label: selectedTrip.name, to: `/trips/${selectedTrip.id}` },
            { label: "Confirm Reservation" },
          ]}
        />

        <div className="mb-4">
          <span className="badge bg-primary-subtle text-primary-emphasis px-3 py-2 rounded-pill fw-semibold small mb-2">
            Step 2 of 2 • Secure Checkout
          </span>
          <h1 className="fw-bolder mb-1" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Complete Your Journey Reservation
          </h1>
          <p className="text-muted small mb-0">
            Review your trip details and submit traveler information for instant confirmation.
          </p>
        </div>

        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg("")} className="mb-4 py-2 px-3 small">
            {errorMsg}
          </Alert>
        )}

        <Row className="gy-4">
          {/* Left Column: Trip Summary Card */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm overflow-hidden" style={{ backgroundColor: "var(--bg-surface)" }}>
              <div className="position-relative" style={{ height: "240px" }}>
                <img
                  src={selectedTrip.image || FALLBACK_IMAGE}
                  alt={selectedTrip.name}
                  className="w-100 h-100 object-fit-cover"
                />
                <span className="badge-category">{selectedTrip.category || "Curated Expedition"}</span>
              </div>

              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                  <IconMapPin size={15} />
                  <span>{selectedTrip.destination}</span>
                </div>
                <h3 className="h5 fw-bold mb-2">{selectedTrip.name}</h3>

                <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                  <IconClock size={15} />
                  <span>{selectedTrip.duration}</span>
                  <span>•</span>
                  <span>{selectedTrip.difficulty}</span>
                </div>

                {/* Price Breakdown */}
                <div className="p-3 rounded-3 bg-body-tertiary mb-3 small">
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>Rate per person</span>
                    <span>₹{pricePerPerson.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>Number of travelers</span>
                    <span>× {numberOfPeople}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Taxes &amp; Service Fees</span>
                    <span className="text-success">Included</span>
                  </div>
                  <div className="border-top pt-2 d-flex justify-content-between fw-bold text-dark fs-6">
                    <span>Total Amount</span>
                    <span style={{ color: "var(--brand-accent)" }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2 small text-muted">
                  <IconShieldCheck size={18} className="text-success flex-shrink-0 mt-1" />
                  <span>
                    Instant reservation via Firebase Cloud Firestore. Confirmation details are stored in your My Bookings dashboard.
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Traveler Details Form */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm p-4 p-md-5" style={{ backgroundColor: "var(--bg-surface)" }}>
              <h2 className="h5 fw-bold mb-4">Lead Traveler &amp; Schedule</h2>

              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                  {/* Traveler Name */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">Traveler Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Email */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">Contact Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Phone */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Travel Date */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">Departure Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Number of Travelers */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold d-flex align-items-center gap-1">
                        <IconUsers size={16} /> Number of Travelers (1–20)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="person"
                        min="1"
                        max="20"
                        value={formData.person}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Dynamic Total Display */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">Calculated Grand Total</Form.Label>
                      <Form.Control
                        type="text"
                        value={`₹${grandTotal.toLocaleString("en-IN")}`}
                        readOnly
                        className="fw-bold"
                        style={{ color: "var(--brand-accent)" }}
                      />
                    </Form.Group>
                  </Col>

                  {/* Special Requests */}
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="small fw-bold">
                        Special Requests or Dietary Requirements (Optional)
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="request"
                        placeholder="E.g. Vegetarian breakfast preferences, airport pickup arrival flight, twin bed setup..."
                        value={formData.request}
                        onChange={handleChange}
                        maxLength={500}
                      />
                      <Form.Text className="text-muted small">
                        {500 - formData.request.length} characters remaining
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submission Actions */}
                <div className="d-flex align-items-center justify-content-between gap-3 mt-4 pt-3 border-top flex-wrap">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-brand-accent px-5 py-3 fw-bold d-inline-flex align-items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span>Reserving Journey...</span>
                      </>
                    ) : (
                      <>
                        <IconCheck size={18} />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal
          show={Boolean(confirmedBookingId)}
          onHide={() => navigate("/myBookings")}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title className="h5 fw-bold text-success d-flex align-items-center gap-2">
              <span className="p-2 rounded-circle bg-success text-white d-inline-flex">
                <IconCheck size={18} />
              </span>
              Booking Confirmed!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <p className="mb-2">
              Congratulations <strong>{formData.name}</strong>! Your expedition to{" "}
              <strong>{selectedTrip.name}</strong> has been successfully booked.
            </p>
            <div className="p-3 rounded-3 bg-body-tertiary my-3 small">
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Booking Reference:</span>
                <span className="fw-bold font-monospace">{confirmedBookingId}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Departure Date:</span>
                <span className="fw-semibold">{formData.date}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Travelers:</span>
                <span className="fw-semibold">{numberOfPeople}</span>
              </div>
              <div className="d-flex justify-content-between pt-1 border-top">
                <span className="text-muted">Total Paid / Due:</span>
                <span className="fw-bold text-dark">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="text-muted small mb-0">
              You can review, manage, or cancel this booking anytime through the My Bookings portal.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
            <button
              type="button"
              className="btn btn-brand-primary"
              onClick={() => navigate("/myBookings")}
            >
              View in My Bookings
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BookingForm;