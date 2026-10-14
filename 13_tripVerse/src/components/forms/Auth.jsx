import { useState } from "react";
import { Container, Row, Col, Card, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../context/useAuth";
import { IconCompass, IconEye, IconEyeOff } from "../ui/Icons";

const Auth = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Target destination after successful auth
  const redirectTarget = location.state?.from?.pathname || "/trips";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const mapFirebaseError = (errCode) => {
    switch (errCode) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password. Please verify your credentials and try again.";
      case "auth/email-already-in-use":
        return "An account with this email address already exists. Please sign in instead.";
      case "auth/weak-password":
        return "Password is too weak. Please choose a password with at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was cancelled before completing.";
      case "auth/network-request-failed":
        return "Network connection error. Please verify your internet connection and retry.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait a moment and try again.";
      default:
        return "Authentication encountered an issue. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Basic Validation
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }
    if (!isLogin && !formData.name.trim()) {
      setError("Please provide your full name to create an account.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email.trim(), formData.password);
        navigate(redirectTarget, { replace: true });
      } else {
        const userCredential = await signup(formData.email.trim(), formData.password);
        if (formData.name.trim() && userCredential.user) {
          try {
            await updateProfile(userCredential.user, {
              displayName: formData.name.trim(),
            });
          } catch {
            // Profile update non-fatal
          }
        }
        setSuccessMsg("Account created successfully!");
        navigate(redirectTarget, { replace: true });
      }
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="py-5 d-flex align-items-center" style={{ minHeight: "85vh" }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={8} sm={10}>
            <Card className="border-0 shadow-lg p-4 p-md-5 rounded-4" style={{ backgroundColor: "var(--bg-surface)" }}>
              {/* Brand Logo & Header */}
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-3"
                  style={{ backgroundColor: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
                >
                  <IconCompass size={32} />
                </div>
                <h2 className="fw-bolder mb-1" style={{ fontSize: "1.75rem", color: "var(--text-primary)" }}>
                  {isLogin ? "Welcome Back" : "Begin Your Journey"}
                </h2>
                <p className="text-muted small mb-0">
                  {isLogin
                    ? "Sign in to access your booked itineraries and wishlist."
                    : "Create an account to reserve trips and manage travels."}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError("")} className="py-2 px-3 small">
                  {error}
                </Alert>
              )}

              {/* Success Alert */}
              {successMsg && (
                <Alert variant="success" className="py-2 px-3 small">
                  {successMsg}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                {/* Full Name for Signup */}
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )}

                {/* Email Address */}
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="explorer@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </Form.Group>

                {/* Password with Visibility Toggle */}
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold">Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    </button>
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-brand-primary w-100 py-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading || googleLoading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>{isLogin ? "Authenticating..." : "Creating Account..."}</span>
                    </>
                  ) : (
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  )}
                </button>

                {/* Divider */}
                <div className="position-relative my-3 text-center">
                  <hr className="my-0 text-muted" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle px-3 small text-muted"
                    style={{ backgroundColor: "var(--bg-surface)" }}
                  >
                    or continue with
                  </span>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="btn btn-brand-outline w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-3"
                  onClick={handleGoogleAuth}
                  disabled={loading || googleLoading}
                >
                  {googleLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>Google</span>
                </button>

                {/* Switch between Login and Signup */}
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none small p-0 text-muted"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                      setSuccessMsg("");
                    }}
                  >
                    {isLogin ? (
                      <>
                        Don't have an account? <strong style={{ color: "var(--brand-accent)" }}>Sign Up</strong>
                      </>
                    ) : (
                      <>
                        Already have an account? <strong style={{ color: "var(--brand-accent)" }}>Sign In</strong>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            </Card>

            <div className="text-center mt-4">
              <Link to="/" className="text-muted small text-decoration-none">
                ← Return to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
