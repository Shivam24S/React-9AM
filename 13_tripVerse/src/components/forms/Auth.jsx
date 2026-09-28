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

const Auth = () => {
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(false)

    const handleChange = (field, e) => {
        setAuthData((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });

        console.log("authData", authData);
    };

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center align-items-center flex-column min-vh-100">
                    <Card className="p-5 shadow rounded-5">
                        <Form>
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
                            <div className="d-grid gap-4">
                                <Button type="submit">Login</Button>
                                <Button variant="warning">Signup</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;
