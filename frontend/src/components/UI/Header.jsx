import React from "react"
import { Container, Navbar } from "react-bootstrap";

const header = () => {
    return (

        <Navbar expand="lg" sticky="top" bg="dark" data-bs-theme="dark" className="bg-body-tertiary nav-bg" >
            <Container>
                <Navbar.Brand href="/" className="text-center fw-semibold">Kanban Board</Navbar.Brand>
            </Container>
        </Navbar>

    )
}

export default header