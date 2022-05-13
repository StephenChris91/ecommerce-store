import { Card, Button} from 'react-bootstrap'
import Rating from './Rating'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux';
import { CART_ADD_ITEM } from '../constants/cartConstants';
import { addItemToCart } from '../actions/cartActions';
import { useState, useEffect } from 'react';
import { clearProductDetails } from '../actions/productActions';


const Product = ( { product } ) => {

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const redirectToProduct = () => {
    //     navigate(`/products/${product.id}`)
    // }

    // const addToCartHandler = () => {
    //     //TODO
    //     dispatch(addItemToCart(id, qty));
    //     //navigate(`/cart/${product.id}`);
    // }

    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    //const { product, loading, error } = useSelector(state => state.productList);

    useEffect(() => {
        // dispatch(addItemToCart(id));

        return () => {
            dispatch(clearProductDetails());
        }
    }, [dispatch, id])

    const addToCartHandler = () => {
        //TODO
        dispatch(addItemToCart(product._id, qty));
       // navigate(`/cart/${id}?qty=${qty}`);
    }

  return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
            <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as="h3">
                <strong>${product.price}</strong>
            </Card.Text>
            <Link to={`/product/${product._id}`}>
                <Button variant="primary" className="btn btn-primary rounded">View Product</Button>
            </Link>
            <i className="fas fa-shopping-cart" onClick={addToCartHandler}></i>
        </Card>
  )
}

export default Product