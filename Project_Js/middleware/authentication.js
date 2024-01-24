const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'Hello ram!!', (err, decodedToken) =>{
            if(err){
                console.log(err);
                res.status(400).json({msg: "Invalid Token"})
            }
            else{
                console.log(decodedToken);
                req.user = decodedToken
                next()
            }
        })
    }
    else{
        res.status(401).json({msg : "Missing token"})
    }
}

module.exports = {
    requireAuth,
}