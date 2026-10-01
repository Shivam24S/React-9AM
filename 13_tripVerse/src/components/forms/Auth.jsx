import { useState } from "react";
import {
    Col,
    Card,
    Container,
    Form,
    FloatingLabel,
    Row,
    Button,
} from "react-bootstrap";

import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(true);

    const handleChange = (field, e) => {
        setAuthData((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });

        console.log("authData", authData);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const result = await signInWithEmailAndPassword(
                auth,
                authData.email,
                authData.password,
            );

            if (!result) {
                navigate("/auth")
            } else {
                navigate("/trips")
            }

        } else {
            const result = await createUserWithEmailAndPassword(
                auth,
                authData.email,
                authData.password,
            );


            if (!result) {
                navigate("/auth")
            } else {
                navigate("/trips")
            }
        }
    };


    const handleGoogleLogin = async () => {

        const result = await signInWithPopup(auth, googleProvider);

        console.log("google result", result)

    }

    const navigate = useNavigate()


    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center align-items-center flex-column min-vh-100">
                    <Card className="p-5 shadow rounded-5">
                        <h1 className="text-center mb-4">
                            {isLogin ? "Login" : "sign up"}
                        </h1>
                        <Form onSubmit={handleFormSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    value={authData.email}
                                    placeholder="name@example.com"
                                    onChange={(e) => handleChange("email", e)}
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    value={authData.password}
                                    placeholder="Password"
                                    onChange={(e) => handleChange("password", e)}
                                />
                            </FloatingLabel>
                            <br />
                            <div className="d-grid gap-4 mb-2">
                                <Button type="submit">{isLogin ? "Login" : "sign up"}</Button>
                            </div>

                            <div className="d-grid gap-4 ">
                                <Button variant="success" onClick={handleGoogleLogin} >continue with google</Button>
                            </div>
                            <small className="d-flex justify-content-center align-items-center mt-2">
                                <span type="button" onClick={() => setIsLogin(!isLogin)}>
                                    {isLogin ? "new user ? sign up" : "already have an account"}
                                </span>
                            </small>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;
