const express = require('express');
const products = require('./data/products')


const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
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

app.listen(5000, console.log('Server is running on port 5000'))