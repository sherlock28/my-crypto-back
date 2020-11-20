import jwt from 'jsonwebtoken';

export const TokenValidation = (req, res, next) => {
    const token = req.header('authorization');
    if(!token) {
        return res.status(401).json({message: 'access denied.'});
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.id = payload.id;
        req.username = payload.username;
        req.email = payload.email;
        next();
    } catch (err) {
        return res.status(401).json({
            error: 'invalid token.'
        });
    }
};
