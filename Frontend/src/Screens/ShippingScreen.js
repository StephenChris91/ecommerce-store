import React, {useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/checkoutSteps'


export default function ShippingScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.cty)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

   

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')

    }
    

    return <FormContainer>
        <CheckoutSteps step1={false} step2={true} step3={false} step4={false}/>
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
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
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
