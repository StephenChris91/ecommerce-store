import React from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Message} from '../Components/Message';
import CheckoutSteps from '../Components/checkoutSteps';

export default function PlaceOrderScreen() {
    
    const cart = useSelector(state => state.cart)

    const placeOrderHandler = () => {
        console.log('Order Received')
    }

    const addDecimals = (num) => {
        return Number(num).toFixed(2)
    }

    return (
        <>
            <div>
                <CheckoutSteps step1={false} step2={false} step3={false} step4={true}/>
                <h2>Order Summary</h2>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Shipping</h4>
                                <p>
                                    <strong>Address:</strong> {' '}  
                                    {cart.shippingAddress.address}{' '}  
                                    {cart.shippingAddress.city}, {' '}  
                                    {cart.shippingAddress.postCode}, {' '}  
                                    {cart.shippingAddress.country} {' '}  
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Payment</h4>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Products</h4>
                                {cart.cartItems.length === 0 ? <Message>Your Cart is empty <Link to='/'>Go Back</Link></Message> : (
                                    <ListGroup.Item>
                                        {cart.cartItems.map((item, index)=> (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup.Item>
                                )} 
                            </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Price Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Subtotal</strong>
                                        </Col>
                                        <Col>
                                            ${addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Shipping Price:
                                        </Col>
                                        <Col>
                                            ${ cart.cartItems.length < 1 ? addDecimals(cart.shippingPrice = 0) : addDecimals(cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Tax Price:
                                        </Col>
                                        <Col>
                                            ${addDecimals(Number((cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 0.15)))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total:
                                        </Col>
                                        <Col>
                                            ${addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + cart.shippingPrice + Number((cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 0.15)))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type="button" className="btn-block" 
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}>Place Order</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}
