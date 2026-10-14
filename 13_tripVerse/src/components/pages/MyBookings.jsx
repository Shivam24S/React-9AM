import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/useAuth";
import { trips } from "../../data/Trips";
import Breadcrumbs from "../ui/Breadcrumbs";
import SectionHeading from "../ui/SectionHeading";
import ConfirmationModal from "../ui/ConfirmationModal";
import {
  IconCalendar,
  IconUsers,
  IconMapPin,
  IconTrash,
  IconClock,
  IconCompass,
  IconCheck,
} from "../ui/Icons";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(Boolean(user));
  const [errorMsg, setErrorMsg] = useState("");
  const [cancelModalState, setCancelModalState] = useState({
    show: false,
    bookingId: null,
    tripName: "",
    isDeleting: false,
  });

  useEffect(() => {
    let isMounted = true;

    if (!user) {
      return;
    }

    const loadBookings = async () => {
      try {
        // First attempt: User-scoped query ordered by creation date
        let querySnapshot;
        try {
          const qOrdered = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          querySnapshot = await getDocs(qOrdered);
        } catch (orderErr) {
          // Fallback if Firestore composite index is missing:
          console.warn(
            "Composite index not yet available in Firestore. Falling back to client-side sort:",
            orderErr.message
          );
          const qSimple = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid)
          );
          querySnapshot = await getDocs(qSimple);
        }

        const rawBookings = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const catalogTrip = trips.find((t) => t.id === Number(data.tripId));

          return {
            id: docSnap.id,
            ...data,
            // Fallback normalization
            tripName: data.tripName || catalogTrip?.name || "Curated Journey",
            tripDestination: data.tripDestination || catalogTrip?.destination || "Global Destination",
            tripImage: data.tripImage || data.image || catalogTrip?.image || FALLBACK_IMAGE,
            tripDuration: data.tripDuration || catalogTrip?.duration || "Multiple Days",
            totalPrice: data.totalPrice || data.total || 0,
            numberOfPeople: data.numberOfPeople || data.person || 1,
            travelDate: data.travelDate || data.date || "Scheduled Date",
            travelerName: data.travelerName || data.name || user.displayName || "Lead Traveler",
            status: data.status || "Confirmed",
            createdAtDate: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          };
        });

        // Sort in JS to ensure newest first regardless of fallback
        rawBookings.sort((a, b) => b.createdAtDate - a.createdAtDate);
        if (isMounted) {
          setBookings(rawBookings);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (isMounted) {
          setErrorMsg("Failed to retrieve your bookings. Please check your connection and refresh the page.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleOpenCancelModal = (booking) => {
    setCancelModalState({
      show: true,
      bookingId: booking.id,
      tripName: booking.tripName,
      isDeleting: false,
    });
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalState.bookingId) return;

    setCancelModalState((prev) => ({ ...prev, isDeleting: true }));

    try {
      await deleteDoc(doc(db, "bookings", cancelModalState.bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== cancelModalState.bookingId));
      setCancelModalState({ show: false, bookingId: null, tripName: "", isDeleting: false });
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Unable to cancel booking at this time. Please retry later.");
      setCancelModalState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  return (
    <div className="py-4 py-lg-5">
      <Container>
        <Breadcrumbs items={[{ label: "My Bookings" }]} />

        <SectionHeading
          badge="Traveler Dashboard"
          title="Your Reserved Expeditions"
          subtitle="Manage your upcoming adventures, check itinerary dates, and review booking summaries."
          centered={false}
          className="mb-4"
        />

        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg("")} className="py-2 px-3 small mb-4">
            {errorMsg}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" style={{ width: "42px", height: "42px" }} />
            <h5 className="mt-3 fw-semibold">Loading your bookings...</h5>
            <p className="text-muted small">Retrieving records from Cloud Firestore...</p>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div
            className="text-center py-5 px-3 rounded-4 border bg-surface my-4"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="d-inline-flex p-3 rounded-circle mb-3"
              style={{ backgroundColor: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
            >
              <IconCompass size={36} />
            </div>
            <h3 className="h5 fw-bold mb-2">No Bookings Found</h3>
            <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "420px" }}>
              You haven't reserved any journeys yet. Explore our curated catalog of 16 world destinations to plan your next escape.
            </p>
            <Link to="/trips" className="btn btn-brand-primary px-4 py-2">
              Explore Available Trips
            </Link>
          </div>
        ) : (
          /* Bookings Grid */
          <>
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <span className="text-muted small">
                Showing <strong className="text-dark">{bookings.length}</strong> active reservation{bookings.length === 1 ? "" : "s"}
              </span>
              <Link to="/trips" className="small fw-semibold text-decoration-none" style={{ color: "var(--brand-accent)" }}>
                + Book Another Journey
              </Link>
            </div>

            <Row className="gy-4">
              {bookings.map((booking) => (
                <Col xs={12} key={booking.id}>
                  <Card className="border-0 shadow-sm overflow-hidden" style={{ backgroundColor: "var(--bg-surface)" }}>
                    <Row className="g-0 align-items-center">
                      {/* Image Thumbnail */}
                      <Col md={4} lg={3} className="position-relative" style={{ minHeight: "220px" }}>
                        <img
                          src={booking.tripImage}
                          alt={booking.tripName}
                          className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                        <span className="badge-category">{booking.tripDuration}</span>
                      </Col>

                      {/* Details Body */}
                      <Col md={8} lg={9}>
                        <Card.Body className="p-4 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                              <span className="d-flex align-items-center gap-1 text-muted small fw-medium">
                                <IconMapPin size={15} className="text-secondary" />
                                {booking.tripDestination}
                              </span>

                              <div className="d-flex align-items-center gap-2">
                                <Badge bg="success-subtle" className="text-success-emphasis rounded-pill px-3 py-1">
                                  <IconCheck size={12} className="me-1" />
                                  {booking.status}
                                </Badge>
                                <span className="text-muted small font-monospace">
                                  Ref: #{booking.id.slice(0, 8)}
                                </span>
                              </div>
                            </div>

                            <Card.Title className="h5 fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
                              {booking.tripName}
                            </Card.Title>

                            {/* Booking Attributes */}
                            <Row className="g-3 mb-3 small">
                              <Col sm={4} xs={6}>
                                <span className="text-muted d-block">Travel Date</span>
                                <span className="fw-semibold d-flex align-items-center gap-1">
                                  <IconCalendar size={14} className="text-primary" />
                                  {booking.travelDate}
                                </span>
                              </Col>

                              <Col sm={4} xs={6}>
                                <span className="text-muted d-block">Party Size</span>
                                <span className="fw-semibold d-flex align-items-center gap-1">
                                  <IconUsers size={14} className="text-primary" />
                                  {booking.numberOfPeople} Traveler{booking.numberOfPeople > 1 ? "s" : ""}
                                </span>
                              </Col>

                              <Col sm={4} xs={12}>
                                <span className="text-muted d-block">Total Paid / Due</span>
                                <span className="fw-bold fs-6" style={{ color: "var(--brand-accent)" }}>
                                  ₹{Number(booking.totalPrice).toLocaleString("en-IN")}
                                </span>
                              </Col>

                              {booking.travelerName && (
                                <Col xs={12} className="text-muted">
                                  <span>Primary Traveler: </span>
                                  <strong className="text-dark">{booking.travelerName}</strong> ({booking.email})
                                </Col>
                              )}

                              {booking.specialRequests && (
                                <Col xs={12}>
                                  <div className="p-2 rounded bg-body-tertiary text-muted fst-italic">
                                    Special note: "{booking.specialRequests}"
                                  </div>
                                </Col>
                              )}
                            </Row>
                          </div>

                          {/* Action Buttons */}
                          <div className="d-flex align-items-center justify-content-between pt-3 border-top flex-wrap gap-2">
                            <span className="text-muted small d-flex align-items-center gap-1">
                              <IconClock size={13} />
                              Booked on {booking.createdAtDate.toLocaleDateString()}
                            </span>

                            <div className="d-flex align-items-center gap-2">
                              {booking.tripId && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => navigate(`/trips/${booking.tripId}`)}
                                >
                                  View Itinerary
                                </button>
                              )}

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                                onClick={() => handleOpenCancelModal(booking)}
                              >
                                <IconTrash size={14} />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Cancellation Confirmation Dialog */}
        <ConfirmationModal
          show={cancelModalState.show}
          onHide={() => setCancelModalState({ show: false, bookingId: null, tripName: "", isDeleting: false })}
          onConfirm={handleConfirmCancel}
          title="Cancel Reservation"
          message={`Are you sure you wish to cancel your booking for "${cancelModalState.tripName}"? This record will be permanently removed from your dashboard.`}
          confirmLabel="Yes, Cancel Booking"
          confirmVariant="danger"
          isLoading={cancelModalState.isDeleting}
        />
      </Container>
    </div>
  );
};

export default MyBookings;
