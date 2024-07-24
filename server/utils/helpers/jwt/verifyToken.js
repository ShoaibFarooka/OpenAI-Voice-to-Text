import jwt from 'jsonwebtoken';

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

export default verifyToken;