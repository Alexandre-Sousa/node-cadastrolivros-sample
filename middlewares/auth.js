import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: 'access denied'});
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        console.log(decoded);
    } catch (error) {
        return res.status(401).json({message: 'invalid token'});
    }

    next();

}

export default auth;