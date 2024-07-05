import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw Object.assign(new Error("No token available"), { code: 500 });
        }
        const jwtsecret = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token.split(' ')[1], jwtsecret);
        if (decoded) {
            req.user = decoded;
            next();
        }
    } catch (error) {
        next(error);
    }
};

export default authorization;
