import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../Components/Rating'
import products from '../products'

//params
import { useParams } from 'react-router-dom'


const ProductScreen = (  ) => {
    const { id } = useParams()
    const product = products.find( product => product._id === id )

    return (
        <div className="m-20">
            <Link to="/" className="btn bg-light rounded mb-2 mt-5">Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                    </ListGroup.Item>   
                    <ListGroup.Item>
                        <strong>Price: </strong>
                        <span>${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description: </strong>
                        <span>{product.description}</span>
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card className="rounded">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        {product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        In Stock:
                                    </Col>
                                    <Col>
                                        {`${product.countInStock}` > 0 ? `${product.countInStock} Items` : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <Button className="btn-block m-2 rounded" variant="success" type="button" disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>

        
    )
}

export default ProductScreen