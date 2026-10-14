import { Link } from "react-router-dom";
import { IconChevronRight } from "./Icons";

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="py-2 mb-3">
      <ol className="d-flex align-items-center flex-wrap list-unstyled m-0 p-0 small">
        <li className="d-flex align-items-center">
          <Link to="/" className="text-muted text-decoration-none hover-link">
            Home
          </Link>
          <IconChevronRight size={14} className="mx-2 text-muted" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="d-flex align-items-center">
              {isLast || !item.to ? (
                <span className="fw-semibold text-truncate" style={{ maxWidth: "240px", color: "var(--text-primary)" }} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className="text-muted text-decoration-none hover-link">
                    {item.label}
                  </Link>
                  <IconChevronRight size={14} className="mx-2 text-muted" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
