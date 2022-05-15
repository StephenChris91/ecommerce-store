import React from 'react'
import {useState} from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Message } from './Message';
import { removeFromCart } from '../actions/cartActions';



export function CartDropdown( { isOpen } ) {

    const [qty, setQty] = useState(1);
    const [open, setOpen] = useState(isOpen)
    const id = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    const checkoutHandler = () => {
        console.log(open)
        navigate(`/cart`);
        setOpen(!isOpen)
        
    }
            
    

    return (
        <>
             {open && cartItems.length === 0 ? '' : (
             <div id="cart-drop-down" className='cart-drop'>
                {cartItems.map((item, index) => (
                    <Row key={index}>
                        <Col variant='flush'>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col>
                            <p>{item.name}</p>
                        </Col>
                        <Col>
                            <p>${item.price}</p>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>X</Button>
                        </Col>
                    </Row>
                    
                ))}
                <Row>
                    <Button variant="primary" className="dropdown-btn rounded"onClick={checkoutHandler}>Checkout</Button>
                </Row>
            </div>
             )
            }
        </>
    )
}
