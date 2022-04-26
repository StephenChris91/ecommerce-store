import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import products from './data/products.js';


dotenv.config();


connectDB()


const app = express();

app.get('/', (req, res) => {
    res.send('API is running....');
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product._id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));