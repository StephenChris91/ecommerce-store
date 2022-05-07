import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import { notFound, errorHandler } from './data/middleware/errorMiddleware.js';



import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();


connectDB()


const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...');
})


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/cart/api/products', productRoutes);

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));