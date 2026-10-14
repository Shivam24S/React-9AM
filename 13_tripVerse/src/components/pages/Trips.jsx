import { useMemo } from "react";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { trips, CATEGORIES } from "../../data/Trips";
import TripCard from "../ui/TripCard";
import Breadcrumbs from "../ui/Breadcrumbs";
import SectionHeading from "../ui/SectionHeading";
import { IconSearch, IconFilter, IconX } from "../ui/Icons";
import { getRecentlyViewedTrips } from "../../utils/recentlyViewed";

const Trips = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params with defaults
  const searchTerm = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "All";
  const budgetFilter = searchParams.get("budget") || "all";
  const durationFilter = searchParams.get("duration") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  // Helper to update individual URL query param
  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === "all" || value === "All" || (key === "sort" && value === "featured")) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Recently viewed trips
  const recentlyViewed = useMemo(() => getRecentlyViewedTrips(), []);

  // Filter and sort computation
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // 1. Search term match (in name or destination or country)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = trip.name.toLowerCase().includes(query);
        const matchDest = trip.destination.toLowerCase().includes(query);
        const matchCountry = trip.country?.toLowerCase().includes(query);
        if (!matchName && !matchDest && !matchCountry) return false;
      }

      // 2. Category match
      if (categoryFilter !== "All" && trip.category !== categoryFilter) {
        return false;
      }

      // 3. Budget match
      if (budgetFilter === "under100k" && trip.price >= 100000) return false;
      if (budgetFilter === "100k-140k" && (trip.price < 100000 || trip.price > 140000)) return false;
      if (budgetFilter === "above140k" && trip.price <= 140000) return false;

      // 4. Duration match (parse days e.g. "5 Days / 4 Nights")
      if (durationFilter !== "all") {
        const days = parseInt(trip.duration, 10) || 5;
        if (durationFilter === "short" && days > 5) return false;
        if (durationFilter === "long" && days <= 5) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, categoryFilter, budgetFilter, durationFilter, sortBy]);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    categoryFilter !== "All" ||
    budgetFilter !== "all" ||
    durationFilter !== "all" ||
    sortBy !== "featured"
  );

  return (
    <div className="py-4 py-lg-5">
      <Container>
        <Breadcrumbs items={[{ label: "Explore Trips" }]} />

        <SectionHeading
          badge="Curated Catalog"
          title="Explore Extraordinary Journeys"
          subtitle="Filter 16 worldwide travel experiences by travel style, duration, budget, and guest ratings."
          centered={false}
          className="mb-4"
        />

        {/* Filter & Control Bar */}
        <div
          className="card p-3 p-lg-4 mb-4 border-0 shadow-sm"
          style={{ backgroundColor: "var(--bg-surface)" }}
        >
          <Row className="g-3 align-items-center">
            {/* Search Input */}
            <Col lg={4} md={6}>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted">
                  <IconSearch size={18} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search by destination or title..."
                  value={searchTerm}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="border-start-0 ps-0"
                  aria-label="Search trips"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="btn btn-link text-muted p-2"
                    onClick={() => updateFilter("search", "")}
                    aria-label="Clear search"
                  >
                    <IconX size={16} />
                  </button>
                )}
              </div>
            </Col>

            {/* Category Filter */}
            <Col lg={2} sm={6}>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => updateFilter("category", e.target.value)}
                aria-label="Filter by category"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Styles" : cat}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Budget Filter */}
            <Col lg={2} sm={6}>
              <Form.Select
                value={budgetFilter}
                onChange={(e) => updateFilter("budget", e.target.value)}
                aria-label="Filter by budget"
              >
                <option value="all">Any Budget</option>
                <option value="under100k">Under ₹1,00,000</option>
                <option value="100k-140k">₹1,00,000 – ₹1,40,000</option>
                <option value="above140k">Above ₹1,40,000</option>
              </Form.Select>
            </Col>

            {/* Duration Filter */}
            <Col lg={2} sm={6}>
              <Form.Select
                value={durationFilter}
                onChange={(e) => updateFilter("duration", e.target.value)}
                aria-label="Filter by duration"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (1–5 Days)</option>
                <option value="long">Extended (6+ Days)</option>
              </Form.Select>
            </Col>

            {/* Sort Order */}
            <Col lg={2} sm={6}>
              <Form.Select
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                aria-label="Sort trips"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: Highest</option>
                <option value="name-asc">Alphabetical (A–Z)</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Category Quick Pills */}
          <div className="d-flex align-items-center gap-2 mt-3 pt-3 border-top flex-wrap">
            <span className="small text-muted fw-semibold me-1 d-flex align-items-center gap-1">
              <IconFilter size={14} /> Quick Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 ${
                    isActive ? "btn-brand-accent text-white" : "btn-outline-secondary"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                  onClick={() => updateFilter("category", cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">
              Showing <strong className="text-dark">{filteredTrips.length}</strong> of {trips.length} packages
            </span>
            {hasActiveFilters && (
              <Badge bg="secondary-subtle" className="text-secondary-emphasis rounded-pill px-2">
                Filtered
              </Badge>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-sm btn-link text-danger text-decoration-none d-flex align-items-center gap-1 p-0"
              onClick={handleClearFilters}
            >
              <IconX size={16} />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Trip Cards Grid or Empty State */}
        {filteredTrips.length === 0 ? (
          <div
            className="text-center py-5 px-3 rounded-4 border bg-surface"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="d-inline-flex p-3 rounded-circle mb-3"
              style={{ backgroundColor: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
            >
              <IconSearch size={32} />
            </div>
            <h3 className="h5 fw-bold mb-2">No Matching Journeys Found</h3>
            <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "420px" }}>
              We couldn't find any trips matching your selected filters. Try broadening your criteria or reset all filters.
            </p>
            <button
              type="button"
              className="btn btn-brand-primary px-4 py-2"
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4 mb-5">
            {filteredTrips.map((trip) => (
              <Col key={trip.id}>
                <TripCard trip={trip} />
              </Col>
            ))}
          </Row>
        )}

        {/* Recently Viewed Section (Priority 4) */}
        {recentlyViewed.length > 0 && (
          <div className="mt-5 pt-4 border-top">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="h5 fw-bold mb-0">Recently Viewed Journeys</h4>
              <span className="small text-muted">From your recent explorations</span>
            </div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              {recentlyViewed.slice(0, 4).map((trip) => (
                <Col key={`recent-${trip.id}`}>
                  <TripCard trip={trip} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Trips;
