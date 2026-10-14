import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { trips, CATEGORIES } from "../../data/Trips";
import TripCard from "../ui/TripCard";
import SectionHeading from "../ui/SectionHeading";
import {
  IconSearch,
  IconMapPin,
  IconCompass,
  IconShieldCheck,
  IconCalendar,
  IconUsers,
  IconStar,
  IconChevronRight,
} from "../ui/Icons";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const featuredTrips = trips.filter((t) => t.featured).slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedCategory && selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedBudget && selectedBudget !== "all") params.set("budget", selectedBudget);
    navigate(`/trips?${params.toString()}`);
  };

  const experienceCategories = [
    {
      title: "Beach Escapes",
      desc: "Sun-drenched coasts and crystal lagoons",
      image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
      category: "Beach Escapes",
    },
    {
      title: "Cultural Experiences",
      desc: "Ancient heritage, temples, and historic wonders",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      category: "Cultural Experiences",
    },
    {
      title: "Adventure Trips",
      desc: "Alpine treks, safaris, and high-altitude climbs",
      image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
      category: "Adventure Trips",
    },
    {
      title: "City Breaks",
      desc: "Cosmopolitan skylines and culinary discovery",
      image: "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg",
      category: "City Breaks",
    },
    {
      title: "Nature Retreats",
      desc: "Northern lights, glaciers, and peaceful landscapes",
      image: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg",
      category: "Nature Retreats",
    },
    {
      title: "Luxury Getaways",
      desc: "Boutique cliffside villas and VIP expeditions",
      image: "https://images.pexels.com/photos/17635101/pexels-photo-17635101.jpeg",
      category: "Luxury Getaways",
    },
  ];

  return (
    <div className="home-page">
      {/* ===================================================================
          1. Hero Section
          =================================================================== */}
      <section
        className="position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          minHeight: "88vh",
          backgroundImage: `url('https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="hero-gradient-overlay" />

        <Container className="position-relative py-5 my-auto" style={{ zIndex: 2 }}>
          <Row className="justify-content-center text-center">
            <Col lg={10} xl={9}>
              <span
                className="badge px-3 py-2 rounded-pill mb-3 fw-semibold text-uppercase"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  letterSpacing: "0.08em",
                  fontSize: "0.8rem",
                }}
              >
                Curated Global Journeys
              </span>

              <h1
                className="display-4 fw-bolder mb-3 text-white"
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                Your Next Great Adventure Starts Here.
              </h1>

              <p
                className="lead mb-4 mx-auto text-white opacity-90 fw-normal"
                style={{ maxWidth: "680px", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
              >
                Discover remarkable destinations, thoughtfully curated journeys, and unforgettable experiences around the world.
              </p>

              {/* Action Buttons */}
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap mb-5">
                <Link to="/trips" className="btn btn-brand-accent px-4 py-3 fw-bold">
                  Explore Curated Trips
                </Link>
                <a
                  href="#featured-destinations"
                  className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold"
                  style={{ backdropFilter: "blur(6px)" }}
                >
                  Featured Destinations
                </a>
              </div>

              {/* ===========================================================
                  2. Destination Search Bar
                  =========================================================== */}
              <div
                className="p-3 p-md-4 rounded-4 shadow-lg text-start"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.96)",
                  color: "#0F172A",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <Form onSubmit={handleSearchSubmit}>
                  <Row className="g-3 align-items-end">
                    {/* Destination Search Input */}
                    <Col lg={4} md={6}>
                      <Form.Label className="small fw-bold text-uppercase text-secondary mb-1">
                        Where to?
                      </Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent border-end-0 text-muted">
                          <IconMapPin size={18} />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="E.g. Paris, Bali, Zermatt..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="border-start-0 ps-0"
                          aria-label="Search destination"
                        />
                      </div>
                    </Col>

                    {/* Category Select */}
                    <Col lg={3} md={6}>
                      <Form.Label className="small fw-bold text-uppercase text-secondary mb-1">
                        Travel Style
                      </Form.Label>
                      <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        aria-label="Filter by travel style"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    {/* Budget Select */}
                    <Col lg={3} md={6}>
                      <Form.Label className="small fw-bold text-uppercase text-secondary mb-1">
                        Budget Range
                      </Form.Label>
                      <Form.Select
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        aria-label="Filter by budget range"
                      >
                        <option value="all">Any Budget</option>
                        <option value="under100k">Under ₹1,00,000</option>
                        <option value="100k-140k">₹1,00,000 – ₹1,40,000</option>
                        <option value="above140k">Above ₹1,40,000</option>
                      </Form.Select>
                    </Col>

                    {/* Search Submit Button */}
                    <Col lg={2} md={6}>
                      <button
                        type="submit"
                        className="btn btn-brand-accent w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                        style={{ height: "46px" }}
                      >
                        <IconSearch size={18} />
                        <span>Search</span>
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex align-items-center justify-content-center gap-4 gap-md-5 mt-4 pt-2 flex-wrap text-white small opacity-90">
                <div className="d-flex align-items-center gap-2">
                  <IconCompass size={18} className="text-warning" />
                  <span>16 Handpicked Global Routes</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <IconShieldCheck size={18} className="text-success" />
                  <span>Transparent Fixed Pricing</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <IconStar size={18} className="text-warning" />
                  <span>4.8 / 5.0 Average Satisfaction</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===================================================================
          3. Featured Destinations Section
          =================================================================== */}
      <section id="featured-destinations" className="py-5 my-3">
        <Container>
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4 pb-2">
            <div>
              <span
                className="badge px-3 py-2 rounded-pill mb-2 fw-semibold text-uppercase"
                style={{
                  backgroundColor: "var(--brand-accent-light)",
                  color: "var(--brand-accent)",
                  fontSize: "0.8rem",
                }}
              >
                Signature Journeys
              </span>
              <h2 className="fw-bold tracking-tight mb-1" style={{ fontSize: "clamp(1.75rem, 3vw, 2.35rem)" }}>
                Featured Destinations
              </h2>
              <p className="text-muted small mb-0">
                Handpicked travel packages offering exceptional culture, natural beauty, and hospitality.
              </p>
            </div>

            <Link
              to="/trips"
              className="btn btn-sm btn-brand-outline mt-3 mt-md-0 align-self-start align-self-md-auto"
            >
              <span>View All 16 Trips</span>
              <IconChevronRight size={16} />
            </Link>
          </div>

          <Row xs={1} sm={2} lg={3} className="g-4">
            {featuredTrips.map((trip) => (
              <Col key={trip.id}>
                <TripCard trip={trip} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===================================================================
          4. Popular Experiences & Categories
          =================================================================== */}
      <section className="py-5" style={{ backgroundColor: "var(--bg-surface-subtle)" }}>
        <Container>
          <SectionHeading
            badge="Travel Styles"
            title="Popular Experiences"
            subtitle="Find the perfect vacation tailored to your rhythm, whether seeking serene beaches or high-octane climbs."
          />

          <Row xs={1} sm={2} lg={3} className="g-4">
            {experienceCategories.map((item, index) => (
              <Col key={index}>
                <div
                  className="card h-100 overflow-hidden border-0 shadow-sm position-relative text-white"
                  style={{
                    minHeight: "220px",
                    cursor: "pointer",
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => navigate(`/trips?category=${encodeURIComponent(item.category)}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/trips?category=${encodeURIComponent(item.category)}`);
                  }}
                >
                  <div
                    className="position-absolute inset-0 w-100 h-100"
                    style={{
                      background: "linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.85) 100%)",
                    }}
                  />

                  <div className="position-relative z-2 p-4 mt-auto">
                    <span className="badge bg-light text-dark rounded-pill px-2 py-1 small fw-semibold mb-2">
                      Experience
                    </span>
                    <h3 className="h5 fw-bold mb-1 text-white">{item.title}</h3>
                    <p className="small mb-3 text-white-50">{item.desc}</p>
                    <span className="small fw-semibold text-warning d-inline-flex align-items-center gap-1">
                      Browse Trips <IconChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===================================================================
          5. Why Choose TripVerse?
          =================================================================== */}
      <section className="py-5 my-4">
        <Container>
          <SectionHeading
            badge="The TripVerse Standard"
            title="Why Choose TripVerse?"
            subtitle="Designed for travelers who demand reliable execution, authentic itineraries, and peace of mind."
          />

          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="card h-100 p-4 border-0 shadow-sm text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mx-auto mb-3"
                  style={{ backgroundColor: "rgba(2, 132, 199, 0.12)", color: "#0284C7" }}
                >
                  <IconCompass size={28} />
                </div>
                <h3 className="h6 fw-bold mb-2">Curated Experiences</h3>
                <p className="text-muted small mb-0">
                  Every package includes verified day-by-day itineraries, tested logistics, and certified local guides.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card h-100 p-4 border-0 shadow-sm text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mx-auto mb-3"
                  style={{ backgroundColor: "rgba(249, 115, 22, 0.12)", color: "#F97316" }}
                >
                  <IconShieldCheck size={28} />
                </div>
                <h3 className="h6 fw-bold mb-2">Transparent Pricing</h3>
                <p className="text-muted small mb-0">
                  No surprise surcharges. See clear lists of what is included and excluded before booking.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card h-100 p-4 border-0 shadow-sm text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mx-auto mb-3"
                  style={{ backgroundColor: "rgba(13, 148, 136, 0.12)", color: "#0D9488" }}
                >
                  <IconCalendar size={28} />
                </div>
                <h3 className="h6 fw-bold mb-2">Booking Management</h3>
                <p className="text-muted small mb-0">
                  Access your trip dates, traveler count, and itinerary details anytime in your personal dashboard.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="card h-100 p-4 border-0 shadow-sm text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mx-auto mb-3"
                  style={{ backgroundColor: "rgba(168, 85, 247, 0.12)", color: "#A855F7" }}
                >
                  <IconUsers size={28} />
                </div>
                <h3 className="h6 fw-bold mb-2">Personalized Discovery</h3>
                <p className="text-muted small mb-0">
                  Save your bucket list destinations with our Wishlist tool and revisit them on any device.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===================================================================
          6. How It Works
          =================================================================== */}
      <section className="py-5" style={{ backgroundColor: "var(--bg-surface)" }}>
        <Container>
          <SectionHeading
            badge="Effortless Booking"
            title="How TripVerse Works"
            subtitle="Four straightforward steps to turn your travel daydreams into a confirmed itinerary."
          />

          <Row className="g-4 position-relative">
            {[
              {
                step: "01",
                title: "Discover Destination",
                desc: "Browse our 16 curated global itineraries with detailed maps, ratings, and best times to visit.",
              },
              {
                step: "02",
                title: "Explore Itinerary",
                desc: "Inspect the day-by-day plan, hotel accommodations, activities, and included meals.",
              },
              {
                step: "03",
                title: "Enter Traveler Info",
                desc: "Choose your travel date, specify travelers, and verify the live dynamic pricing breakdown.",
              },
              {
                step: "04",
                title: "Confirm & Travel",
                desc: "Instant Firestore booking confirmation, with all records preserved in your My Bookings portal.",
              },
            ].map((item, idx) => (
              <Col md={6} lg={3} key={idx}>
                <div className="p-4 rounded-4 h-100 border border-subtle position-relative">
                  <span
                    className="display-5 fw-black d-block mb-3"
                    style={{ color: "var(--brand-accent)", opacity: 0.85 }}
                  >
                    {item.step}
                  </span>
                  <h3 className="h5 fw-bold mb-2">{item.title}</h3>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===================================================================
          7. Testimonials (Clearly Marked Demo Content)
          =================================================================== */}
      <section className="py-5 my-3">
        <Container>
          <SectionHeading
            badge="Traveler Voices"
            title="Loved by Explorers"
            subtitle="Demo community feedback showcasing how travelers experience TripVerse journeys."
          />

          <Row className="g-4">
            {[
              {
                name: "Aarav Sharma",
                location: "Mumbai, India",
                quote:
                  "The Romantic Paris Getaway itinerary was organized down to the minute. The Louvre guide and Seine dinner cruise were completely seamless.",
                trip: "Paris, France",
                rating: 5,
              },
              {
                name: "Elena Rostova",
                location: "Geneva, Switzerland",
                quote:
                  "Zermatt Glacier Express booking was flawless. Clear pricing without hidden luggage fees made our anniversary trip unforgettable.",
                trip: "Swiss Alps Adventure",
                rating: 5,
              },
              {
                name: "Marcus Vance",
                location: "Sydney, Australia",
                quote:
                  "The Northern Lights expedition in Tromsø had exceptional guides who knew exact microclimates. We witnessed green auroras on two consecutive nights!",
                trip: "Tromsø, Norway",
                rating: 5,
              },
            ].map((t, idx) => (
              <Col md={4} key={idx}>
                <div className="card h-100 p-4 border-0 shadow-sm">
                  <div className="d-flex align-items-center gap-1 mb-3 text-warning">
                    {[...Array(t.rating)].map((_, i) => (
                      <IconStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-secondary small fst-italic mb-4 flex-grow-1">
                    "{t.quote}"
                  </p>
                  <div className="border-top pt-3 d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="h6 fw-bold mb-0 text-dark">{t.name}</h4>
                      <span className="text-muted small">{t.location}</span>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2 py-1 small">
                      {t.trip}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <span className="text-muted small fst-italic">
              * Note: Reviews shown above represent illustrative traveler experiences for demonstration.
            </span>
          </div>
        </Container>
      </section>

      {/* ===================================================================
          8. Final CTA
          =================================================================== */}
      <section className="py-5">
        <Container>
          <div
            className="p-5 rounded-4 text-center text-white position-relative overflow-hidden shadow-lg"
            style={{
              backgroundColor: "var(--brand-navy)",
              backgroundImage:
                "linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(14, 165, 233, 0.8) 100%)",
            }}
          >
            <div className="position-relative z-2 py-3 mx-auto" style={{ maxWidth: "620px" }}>
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase small mb-3">
                Begin The Expedition
              </span>
              <h2 className="display-6 fw-bold text-white mb-3">
                Ready to Discover Your Next Destination?
              </h2>
              <p className="text-white-50 mb-4">
                Explore our full catalog of 16 premium global destinations with transparent itineraries and instant reservations.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                <Link to="/trips" className="btn btn-brand-accent px-4 py-3 fw-bold">
                  Browse All Packages
                </Link>
                <Link to="/auth" className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
