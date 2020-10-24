const jwt = require("jsonwebtoken")

module.exports = (req) => {
    
    try{

        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(
            token,
            process.env.SECRET
        )
        const authData = {
            user_id: decodedToken._id,
            error: false
        }
        return authData;

    }catch (err) {
        const authData = {
            user_id: null,
            error: true
        }
        return authData
    }

}