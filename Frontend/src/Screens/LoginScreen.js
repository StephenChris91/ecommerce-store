import React, {useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../Components/Message'
import {Loader} from '../Components/Loader'
import { Login } from '../actions/userActions'
import { ToastContainer, toast } from 'react-toastify'
import FormContainer from '../Components/FormContainer'

export default function LoginScreen({ location }) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // const { search } = useLocation();
    // const redirectUrl = new URLSearchParams(search).get('redirectUrl')
    // const redirect = redirectUrl ? redirectUrl : '/'
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const loginNotification = () => toast("Login Successful", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        type: toast.TYPE.SUCCESS
    });

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()


        //this is where to submit form data to backend
        dispatch(Login(email, password))
        loginNotification()
    }

    return <FormContainer className="my-5">
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <ToastContainer />
        <Form onSubmit={submitHandler} className="my-2">
            <Form.Group controlId="email" className="my-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" 
                placeholder="Enter your email address"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}>
                
                </Form.Control>
            </Form.Group>


            <Form.Group controlId="password" className="my-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" 
                placeholder="Enter your password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
                
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="my-4" >Sign In</Button>
        </Form>

        <Row className=".mt-#">
            <Col>
                New Customer?{" "}
                <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>  
    </FormContainer>
}
