const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');

        if(!token){
            return res.status(401).json({message: 'No token, Authorization Denied'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = authMiddleware;