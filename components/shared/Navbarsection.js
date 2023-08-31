import React from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import axios from "axios";

import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navbarsection() {
    const isLoggedIn = useAuth();
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await axios.post("/api/logout");
            if (response.status === 200) {
                localStorage.removeItem("isLoggedIn");
                router.push("/auth/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    const handleAuth = () => {
        if (isLoggedIn) logout();
        else {
            router.push("/auth/login");
        }
    };

    return (
        <Navbar bg="white" expand="lg" className="py-lg-3 py-2 px-md-2">
            <Container fluid>
                <Navbar.Brand href="/patients">
                    <span>MAS</span>
                </Navbar.Brand> 
                <Nav className="ms-auto">
                    <Button
                        variant="dark"
                        className="px-4 py-2 rounded-1"
                        onClick={handleAuth}>
                        {isLoggedIn ? "Sign-out" : "Sign-in"}
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navbarsection;
