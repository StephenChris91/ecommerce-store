import React from 'react'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Navigation = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userLogin;
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

  return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Shoppr</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/cart">
                            <i className="fas fa-shopping-cart">Cart</i>
                            <span className="badge badge-pill badge-danger">{`(${cartItems.length})`}</span>
                        </Nav.Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : <Nav.Link as={NavLink} to="/login">
                            <i className="fas fa-user">Login</i>
                        </Nav.Link>}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
  )
}

export default Navigation