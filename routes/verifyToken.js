const jwt = require('jsonwebtoken');
//var dotenv=require('dotenv');

const requireAuth = (req, res, next) => {
    const token = req.header('addUser-token');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                console.log(decodedToken)
                next();
            }

        })
    }
    else {
        res.redirect('/login');
    }


}

module.exports = { requireAuth }