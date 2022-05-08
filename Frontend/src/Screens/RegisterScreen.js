import React, {useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../Components/Message'
import {Loader} from '../Components/Loader'
import { Register } from '../actions/userActions'
import FormContainer from '../Components/FormContainer'

export default function RegisterScreen( ) {
    const [name, setName] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirectUrl')
    const redirect = redirectUrl ? redirectUrl : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password === confirmPassword){
            dispatch(Register(name, email, password))
        }else{
            
            setMessage('Passwords do not match')
        }

        dispatch(Register(name, email, password))

    }

    return <FormContainer className="my-5">
        <h1>Create an Account</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" 
                placeholder="Enter your name"
                value={name} 
                onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" 
                placeholder="Enter your email address"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" 
                placeholder="Enter your password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" 
                placeholder="Confirm your password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="my-4" >Register</Button>
        </Form>

        <Row>
            <Col>
                Have an account ?{" "}
                <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>  
    </FormContainer>
}
