const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const tokenExist = req.headers.authorization;
    
    if (!tokenExist) {
        return res.status(401).json({
            status: 'failed',
            message: "missing please sign up"
        });
        
    } else {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_KEY, {expireIn: "11hr"}, (error, decoded) => {
            if (error) {
                console.log(error)
            } 
                req.user = decoded
                next()
            
        });
    }
}

const verifyResetToken = async (req, res, next)  => {
    const tokenExists =req.body;
    if(tokenExists){
      const {token} = req.body
      console.log(token)
      jwt.verify(token, process.env.JWT_SECRET_KEY, {expireIn: "1hr"}, (error, decodedToken) => {
        if(error){
          return res.status(403).json({
            message: 'invalid token '
          })
        }
        req.user = decodedToken;
        return next()
      })
    } else {
      return res.status(403).json({
        message: 'token has expired'
      })
    }
  }

module.exports = {
    verifyToken,
    verifyResetToken
}