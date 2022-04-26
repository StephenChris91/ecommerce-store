import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected... ${conn.connection}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;