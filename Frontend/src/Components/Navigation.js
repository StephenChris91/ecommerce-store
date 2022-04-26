import React from 'react'
import { Container, Navbar, Nav, Link} from 'react-bootstrap'
import {NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Shoppr</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/cart"><i className="fas fa-shopping-cart">Cart</i></Nav.Link>
                        <Nav.Link as={NavLink} to="/login"><i className="fas fa-user">Login</i></Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
  )
}

export default Navigation