import React, {useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../Components/checkoutSteps'


export default function paymentScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

   

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')

    }
    

    return <FormContainer>
        <CheckoutSteps step1={false} step2={false} step3={true} step4={false}/>
        <h1>Payment</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select a Payment Method</Form.Label>
            
            <Col>
                <Form.Check 
                type="radio" 
                label="Paypal or Credit Card" 
                name="paymentMethod" 
                value="Paypal" 
                id="Paypal" 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                checked />
            </Col>
            <Col>
            {/* <Form.Check 
                type="radio" 
                label="Stripe" 
                name="paymentMethod" 
                value="Stripe" 
                id="Stripe" 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                 /> */}
            </Col>
            </Form.Group>
            <Button variant="primary my-5" type="submit">
                Continue
            </Button>
        </Form>
    </FormContainer>
}
