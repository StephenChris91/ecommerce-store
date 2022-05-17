import React, { useEffect, useParams } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Message} from '../Components/Message';
import {Loader} from '../Components/Loader';
import { createOrder } from '../actions/orderActions';
import { ToastContainer, toast } from 'react-toastify';

export default function PlaceOrderScreen ({  }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderId = useParams()
    
  
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
  
    useEffect(() => {
      if (success) {
        navigate(`/order/${order._id}`)
      }
      // eslint-disable-next-line
    }, [navigate, success])
  
    const placeOrderHandler = () => {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      )
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [])

    return loading ? <Loader /> : error ? <Message variant="danger">You have not place any orders</Message> : 
    <>
        <h1>
            Order {order._id}
        </h1>
        <div>
                <h2>Order Summary</h2>
                <Row>
                <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {order.countryshippingAddress.address}, {order.countryshippingAddress.city}{' '}
                        {order.countryshippingAddress.postalCode},{' '}
                        {order.countryshippingAddress.country}
                    </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup variant='flush'>
                        {order.ordertItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                />
                                </Col>
                                <Col>
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>
                                </Col>
                                <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                            </Row>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    )}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
      </Row>
            </div>
    </>
}
