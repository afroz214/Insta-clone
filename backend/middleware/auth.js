import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const auth = async (req, res, next) => {
    try {
        let token
    
        if (req.header('jwtToken')) {
            token = req.header('jwtToken')
        }
        if (!token) {
            return res.status(401).json({ msg: 'No Token' })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id)
        next()
    } catch (error) {
        res.status(500).json({ msg: 'Invalid Token' })
    }
}

