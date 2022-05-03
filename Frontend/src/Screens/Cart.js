import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const Cart = ( { location }) => {
   const navigate = useNavigate();
   location = useLocation();
  const id  = useParams();

    const qty = new URLSearchParams(location.search).get('qty');
    console.log(qty);

  return (
    <div>Cart</div>
  )
}

export default Cart