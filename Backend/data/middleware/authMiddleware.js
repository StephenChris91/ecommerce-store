import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler( async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id).select('-password')

        console.log(decode)
        next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    
})

export { protect }