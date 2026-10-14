import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/useWishlist";
import TripCard from "../ui/TripCard";
import Breadcrumbs from "../ui/Breadcrumbs";
import SectionHeading from "../ui/SectionHeading";
import { IconHeart } from "../ui/Icons";

const Wishlist = () => {
  const { wishlistTrips } = useWishlist();

  return (
    <div className="py-4 py-lg-5">
      <Container>
        <Breadcrumbs items={[{ label: "Saved Trips / Wishlist" }]} />

        <SectionHeading
          badge="Your Personal Collection"
          title="Curated Wishlist"
          subtitle="Explore the dream journeys and destinations you've bookmarked for your next escape."
          centered={false}
          className="mb-4"
        />

        {wishlistTrips.length === 0 ? (
          <div
            className="text-center py-5 px-3 rounded-4 border bg-surface"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="d-inline-flex p-3 rounded-circle mb-3"
              style={{ backgroundColor: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
            >
              <IconHeart size={36} />
            </div>
            <h3 className="h5 fw-bold mb-2">No Saved Trips Yet</h3>
            <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "420px" }}>
              Click the heart icon on any destination card to save it to your wishlist and revisit it anytime.
            </p>
            <Link to="/trips" className="btn btn-brand-primary px-4 py-2">
              Discover Destinations
            </Link>
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <span className="text-muted small">
                Showing <strong className="text-dark">{wishlistTrips.length}</strong> saved destination{wishlistTrips.length === 1 ? "" : "s"}
              </span>
              <Link to="/trips" className="small fw-semibold text-decoration-none" style={{ color: "var(--brand-accent)" }}>
                + Add more journeys
              </Link>
            </div>

            <Row xs={1} sm={2} lg={3} className="g-4">
              {wishlistTrips.map((trip) => (
                <Col key={trip.id}>
                  <TripCard trip={trip} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
