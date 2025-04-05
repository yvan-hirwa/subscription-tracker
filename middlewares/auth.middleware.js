import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {

    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized', 
                error: 'No token provided'
            });
        }

        //verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user; // Attach the user to the request object
        
        next();

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message
        });
        
    }
}

export default authorize;