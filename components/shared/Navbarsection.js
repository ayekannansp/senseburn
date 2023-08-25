import React from 'react'
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbarsection() {
    return (
        <Navbar bg="white" expand="lg" className='py-3'>
            <Container>
                <Navbar.Brand href="/">
                    <span>New</span> logo
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/auth/login">
                        <Button variant='dark' className='px-4 py-2'>Login</Button>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbarsection