import React, {useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../Components/Message'
import {Loader} from '../Components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { ToastContainer, toast } from 'react-toastify';


export default function ProfileScreen( ) {
    const [name, setName] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //toastify notifcations
    const updated = () => toast("Profile Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        type: toast.TYPE.SUCCESS
    });

    const updateFailed = () => toast("Profile Update Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        type: toast.TYPE.ERROR
    })

    

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const updateProfile = useSelector(state => state.updateProfile);
    const { success } = updateProfile;

    // const { search } = useLocation();
    // const redirectUrl = new URLSearchParams(search).get('redirectUrl')
    // const redirect = redirectUrl ? redirectUrl : '/'

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')	
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails("profile"))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password === confirmPassword){
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password
            }
            ))

            updated()
        }else{
            
            //setMessage('Passwords do not match')
            updateFailed()
        }

        

    }

    return <Row>
        <Col md={5}>
        <h2>Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <ToastContainer />}
        {error && <ToastContainer />}
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

            <Button variant="primary" type="submit" className="my-4" >Update</Button>
        </Form>

        </Col>
        <Col md={7}>
            <h1>My Orders</h1>
        </Col>
    </Row>
}
