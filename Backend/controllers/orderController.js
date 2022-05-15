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


export { addOrderItems }