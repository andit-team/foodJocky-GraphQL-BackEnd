const jwt = require("jsonwebtoken")

module.exports = (req) => {
    
    try{

        if(req.headers.authorization &&
            req.headers.authorization.startsWith('Authorization'))
            {

                const token = req.headers.authorization.split(" ")[1]
                const decodedToken = jwt.verify(
                    token,
                    process.env.SECRET
                )
                if(decodedToken.type === 'admin'){

                    const authData = {
                        type: 'admin',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'owner'){

                    const authData = {
                        type: 'owner',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'restaurant'){

                    const authData = {
                        type: 'restaurant',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'customer'){

                    const authData = {
                        type: 'customer',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'rider'){

                    const authData = {
                        type: 'rider',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'agent'){

                    const authData = {
                        type: 'agent',
                        user_id: decodedToken._id
                    }
                    return authData

                }else if(decodedToken.type === 'agency'){

                    const authData = {
                        type: 'agency',
                        user_id: decodedToken._id
                    }
                    return authData

                }

            }

            const authData = {
                user_id: null,
                type: ""
            }
            return authData

    }catch (err) {
        const authData = {
            user_id: null,
            type: ""
        }
        return authData
    }

}