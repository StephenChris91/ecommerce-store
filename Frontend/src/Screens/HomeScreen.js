import { useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product'
//import products from '../products'
import axios from 'axios';




const HomeScreen = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts();
    }, []);


  return (
            <>
                <Row>
                    <h1>Latest Products</h1>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </>
        )
}

export default HomeScreen