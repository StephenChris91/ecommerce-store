import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addItemToCart } from '../actions/cartActions';

const Cart = ( { match, history}) => {
   //const navigate = useNavigate();

   const { id } = useParams()

  const query = new URLSearchParams(location.search).get('qty')
  const qty = Number(query)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)
  console.log(cart)
  console.log(qty)

  useEffect(() => {
    if (id) {
      dispatch(addItemToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <div>Cart</div>
  )
}

export default Cart