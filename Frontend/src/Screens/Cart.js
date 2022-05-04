import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {Message} from '../Components/Message';
import Loader from '../Components/Loader';
import { Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import { addItemToCart, removeFromCart } from '../actions/cartActions';

const Cart = ( { match, history}) => {
   const navigate = useNavigate();

   const { id } = useParams()

  const query = new URLSearchParams(location.search).get('qty')
  const qty = Number(query)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (id) {
      dispatch(addItemToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeItemFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    navigate('/cart');
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8} className="mt-5">
        <h1>SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <Message >
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control 
                    as="select" 
                    value={item.qty} 
                    onChange={(e) => dispatch(addItemToCart(item.product, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map(i => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={(e) => removeItemFromCartHandler(item.product)}>
                      <i className="fa fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className='mt-5'>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" onClick={checkOutHandler}>Proceed To Checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
      </Col>
    </Row>
  )
}

export default Cart