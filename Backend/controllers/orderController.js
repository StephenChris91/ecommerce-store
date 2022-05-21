import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';




const addOrderItems = asyncHandler(async (req, res) => {
   
    const { orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice } = req.body


    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Order items cannot be empty')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

    
})


const getOrderById = asyncHandler(async (req, res) => {
   
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    if(order){
        res.json(order)
    }else{
        res.status(404).json({msg: 'Order not found'})
    }
})


const updateOrderToPaid = asyncHandler(async (req, res) => {
   
    const order = await Order.findById(req.params.id)
    
    if(order){
        order.isPaid = true
        order.paidAt = new Date()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404).json({msg: 'Order not found'})
    }
})


export { addOrderItems, getOrderById, updateOrderToPaid }