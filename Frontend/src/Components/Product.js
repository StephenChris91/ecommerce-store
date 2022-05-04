import { Card, Button} from 'react-bootstrap'
import Rating from './Rating'
import { Link, useNavigate } from 'react-router-dom'


const Product = ( { product } ) => {

    const navigate = useNavigate();

    const redirectToProduct = () => {
        navigate(`/products/${product.id}`)
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
        </Card>
  )
}

export default Product