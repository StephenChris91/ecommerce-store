import React, {useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {saveShippingAddress } from '../actions/cartActions'


export default function ShippingScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.cty)
    const [postCode, setPostCode] = useState(shippingAddress.postCode)
    const [country, setCountry] = useState(shippingAddress.country)

   

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postCode, country}))
        navigate('/payment')

    }
    

    return <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="postCode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>
            <Button variant="primary my-5" type="submit">
                Continue
            </Button>
        </Form>
    </FormContainer>
}
