import mongoose from 'mongoose';

const reviewSchema = ({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}
}, {
    timestamps: {
        type: Date
    }
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: {
        type: Date
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product