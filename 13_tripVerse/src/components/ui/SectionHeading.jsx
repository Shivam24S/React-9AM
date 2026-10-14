const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}) => {
  return (
    <div className={`mb-4 mb-lg-5 ${centered ? "text-center mx-auto" : ""} ${className}`} style={{ maxWidth: centered ? "680px" : "100%" }}>
      {badge && (
        <span
          className="badge px-3 py-2 rounded-pill mb-2 fw-semibold"
          style={{
            backgroundColor: "var(--brand-accent-light)",
            color: "var(--brand-accent)",
            fontSize: "0.8rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>
      )}
      {title && (
        <h2 className="fw-bold tracking-tight mb-2" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-muted fs-6 mb-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
