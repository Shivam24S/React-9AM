import { useState } from "react";
import { Container, Nav, Navbar, Dropdown, Spinner } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useWishlist } from "../../context/useWishlist";
import { useTheme } from "../../context/useTheme";
import {
  IconCompass,
  IconHeart,
  IconSun,
  IconMoon,
  IconUser,
  IconLogOut,
} from "./Icons";

function NavbarComponent() {
  const { user, loading, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setExpanded(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      setExpanded(false);
      navigate("/");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className="navbar-custom sticky-top py-2 py-lg-3"
      onToggle={(isExp) => setExpanded(isExp)}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" onClick={handleLinkClick} className="d-flex align-items-center gap-2">
          <span
            className="d-flex align-items-center justify-content-center p-2 rounded-circle"
            style={{ backgroundColor: "var(--brand-accent)", color: "#FFFFFF" }}
          >
            <IconCompass size={20} />
          </span>
          <span className="fw-bolder fs-4 tracking-tight" style={{ color: "var(--text-primary)" }}>
            Trip<span style={{ color: "var(--brand-accent)" }}>Verse</span>
          </span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          className="border-0 shadow-none p-1"
        />

        {/* Collapsible Content */}
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto my-2 my-lg-0 align-items-lg-center gap-1 gap-lg-2">
            <Nav.Link as={NavLink} to="/" end onClick={handleLinkClick}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips" onClick={handleLinkClick}>
              Explore Trips
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wishlist" onClick={handleLinkClick} className="d-flex align-items-center gap-1">
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: "var(--brand-accent)",
                    color: "#FFFFFF",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.45rem",
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Nav.Link>

            {user && (
              <Nav.Link as={NavLink} to="/myBookings" onClick={handleLinkClick}>
                My Bookings
              </Nav.Link>
            )}
          </Nav>

          {/* Right Action Controls */}
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0 border-top border-lg-0 mt-2 mt-lg-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              className="btn btn-sm btn-brand-outline p-2 d-flex align-items-center justify-content-center"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Light Mode" : "Dark Mode"}
              style={{ width: "38px", height: "38px" }}
            >
              {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </button>

            {/* Wishlist Icon Quick Button */}
            <Link
              to="/wishlist"
              onClick={handleLinkClick}
              className="btn btn-sm btn-brand-outline p-2 d-none d-lg-flex align-items-center justify-content-center position-relative"
              style={{ width: "38px", height: "38px" }}
              aria-label="Wishlist"
              title="Saved Trips"
            >
              <IconHeart size={18} />
              {wishlist.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "var(--brand-accent)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Authentication States */}
            {loading ? (
              <div className="d-flex align-items-center px-2">
                <Spinner animation="border" size="sm" variant="secondary" />
              </div>
            ) : !user ? (
              <div className="d-flex align-items-center gap-2 w-100 w-lg-auto">
                <Link
                  to="/auth"
                  onClick={handleLinkClick}
                  className="btn btn-sm btn-brand-primary w-100 w-lg-auto px-4"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="transparent"
                  id="user-menu-dropdown"
                  className="p-0 border-0 d-flex align-items-center gap-2 text-decoration-none"
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "var(--brand-primary)",
                      border: "2px solid var(--brand-accent)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {userInitial}
                  </div>
                  <span className="small fw-semibold d-none d-md-inline text-truncate" style={{ maxWidth: "120px", color: "var(--text-primary)" }}>
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2 py-2" style={{ minWidth: "220px", backgroundColor: "var(--bg-surface)" }}>
                  <div className="px-3 py-2 border-bottom mb-1">
                    <p className="small text-muted mb-0">Signed in as</p>
                    <p className="small fw-bold text-truncate mb-0" style={{ color: "var(--text-primary)" }}>
                      {user.email}
                    </p>
                  </div>

                  <Dropdown.Item as={Link} to="/myBookings" onClick={handleLinkClick} className="d-flex align-items-center gap-2 py-2">
                    <IconUser size={16} />
                    <span>My Bookings</span>
                  </Dropdown.Item>

                  <Dropdown.Item as={Link} to="/wishlist" onClick={handleLinkClick} className="d-flex align-items-center gap-2 py-2">
                    <IconHeart size={16} />
                    <span>Wishlist ({wishlist.length})</span>
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleLogOut} className="d-flex align-items-center gap-2 py-2 text-danger">
                    <IconLogOut size={16} />
                    <span>Sign Out</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
