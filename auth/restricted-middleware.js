const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        const secret = process.env.JWT_SECRET || "keep it secret, keep it safe"

        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    message: "You shall not pass!"
                })
            } else {
                req.jwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({
            message: "No credentials provided"
        })
    }
}