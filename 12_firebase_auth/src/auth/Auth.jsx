import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState("");

  const handleChange = (field, e) => {
    setAuthData((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  console.log("authdata", authData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const result = await signInWithEmailAndPassword(
        auth,
        authData.email,
        authData.password,
      );

      setUser(result.user.email);
    } else {
      const result = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password,
      );

      setUser(result.user.email);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
              onSubmit={handleSubmit}
            >
              <Card style={{ width: "30%" }} className="p-3 gap-3">
                <h1 className="text-center">{isLogin ? "Login" : "Sign up"}</h1>
                <h5>{user}</h5>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="enter your email"
                    value={authData.email}
                    onChange={(e) => handleChange("email", e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="enter your password"
                    value={authData.password}
                    onChange={(e) => handleChange("password", e)}
                  ></Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">
                  {isLogin ? "Login" : "Sign up"}
                </Button>
                <Button onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "new user ? Sign up" : "already user"}{" "}
                </Button>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
