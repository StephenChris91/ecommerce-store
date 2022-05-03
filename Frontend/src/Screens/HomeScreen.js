import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product'
import { listProducts } from '../actions/productActions';
import { Loader } from '../Components/Loader';
import { Message } from '../Components/Message';



const HomeScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.productList);
    

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);


  return (
            <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <Row>
                    <h1>Latest Products</h1>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                }
                
            </>
        )
}

export default HomeScreen