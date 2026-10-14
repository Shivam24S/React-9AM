import { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IconMapPin, IconClock, IconStar, IconHeart } from "./Icons";
import { useWishlist } from "../../context/useWishlist";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(trip?.image || FALLBACK_IMAGE);

  if (!trip) return null;

  const isFavorite = isInWishlist(trip.id);

  const handleCardClick = () => {
    navigate(`/trips/${trip.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(trip.id);
  };

  return (
    <Card className="trip-card-interactive h-100 shadow-sm" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") handleCardClick(); }}>
      <div className="card-img-wrapper">
        <img
          src={imgSrc}
          alt={trip.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        {trip.category && (
          <span className="badge-category">
            {trip.category}
          </span>
        )}

        <button
          type="button"
          className={`btn-wishlist ${isFavorite ? "active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <IconHeart size={18} filled={isFavorite} />
        </button>
      </div>

      <Card.Body className="d-flex flex-column p-3 p-md-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="d-flex align-items-center gap-1 text-muted small fw-medium text-truncate" style={{ maxWidth: "70%" }}>
            <IconMapPin size={14} className="text-secondary flex-shrink-0" />
            <span className="text-truncate">{trip.destination}</span>
          </span>

          <span className="d-flex align-items-center gap-1 small fw-semibold text-dark">
            <IconStar size={14} />
            <span>{trip.rating}</span>
            {trip.reviewsCount && (
              <span className="text-muted fw-normal">({trip.reviewsCount})</span>
            )}
          </span>
        </div>

        <Card.Title className="h6 fw-bold mb-2 text-truncate-2" style={{ minHeight: "2.5rem", color: "var(--text-primary)" }}>
          {trip.name}
        </Card.Title>

        <div className="d-flex align-items-center gap-2 text-muted small mb-3">
          <IconClock size={14} />
          <span>{trip.duration}</span>
          <span className="mx-1">•</span>
          <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2 py-0">
            {trip.difficulty}
          </span>
        </div>

        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
          <div>
            <span className="text-muted small d-block" style={{ fontSize: "0.75rem", lineHeight: 1 }}>Starting from</span>
            <span className="fw-bold fs-5" style={{ color: "var(--brand-accent)" }}>
              ₹{Number(trip.price).toLocaleString("en-IN")}
            </span>
            <span className="text-muted small"> / person</span>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-brand-primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trips/${trip.id}`);
            }}
          >
            Details
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TripCard;
