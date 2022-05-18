import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {Message} from '../Components/Message';
import {Loader} from '../Components/Loader';
import { createOrder, getOrderDetails } from '../actions/orderActions';
import { ToastContainer, toast } from 'react-toastify';

export default function PlaceOrderScreen () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [sdkReady, setSdkReady] = useState(false)
    
  
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const updateOrderToPaid = useSelector((state) => state.updateOrderToPaid)
    const { success: successPay, loading:loadingPay } = updateOrderToPaid

    const cart = useSelector((state) => state.cart)
    let { cartItems } = cart  
    useEffect(() => {

        const addPaypalScript = async () => {

            const { data: clientId } = await axios.get('/api/config/paypal')

            console.log(clientId)

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
            console.log(script)
        }


        if(!order || successPay){
            dispatch(getOrderDetails(id))

        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }


        cartItems = [];
    }, [dispatch, id, successPay, order])
  
    // const placeOrderHandler = () => {
    //   dispatch(
    //     createOrder({
    //       orderItems: cart.cartItems,
    //       shippingAddress: cart.shippingAddress,
    //       paymentMethod: cart.paymentMethod,
    //       itemsPrice: cart.itemsPrice,
    //       shippingPrice: cart.shippingPrice,
    //       taxPrice: cart.taxPrice,
    //       totalPrice: cart.totalPrice,
    //     })
    //   )
    // }

    const sucessPaymentHandler = () => {
        console.log('Paid')
    }

    

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
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variant="success">Items Delivered</Message> : <Message variant="danger">Not Delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    {order.isPaid ? <Message variant="success">Paid Successfully</Message> : <Message variant="danger">Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
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
                   {!order.isPaid && (
                       <ListGroup.Item>
                           {loading && <Loader />}
                           {!sdkReady ? (
                               <Loader />
                           ) : (
                               <PayPalButton 
                                 amount={order.totalPrice}
                                 onSuccess={sucessPaymentHandler}
                                 />
                           )}
                       </ListGroup.Item>
                   )}
                    </ListGroup>
                </Card>
            </Col>
      </Row>
            </div>
    </>
}
