import React from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
    const router = useRouter();

    const login = async () => {
        try {
            const { data } = await axios.post("/api/auth", {
                username: "info@mastest.com",
                password: "vr@(5C=V",
            });

            if (data.message === "Authentication successful") {
                localStorage.setItem("isLoggedIn", "true"); // Set flag
                router.push("/patients");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            <section className="login">
                <div className="left-wrapper">
                    <Image src="/img/body-bg.png" alt="" />
                </div>
                <div className="right-wrapper">
                    <div className="login-wrapper">
                        <h3 className="mb-2">Login</h3>
                        <p className="mb-5">
                            Welcome back! Please enter your details.
                        </p>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                className="mt-4 px-5 py-3"
                                onClick={login}>
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
