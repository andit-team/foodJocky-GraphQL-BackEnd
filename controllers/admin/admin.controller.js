const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addAdmin = async(root, args, context) => {
    
    try{

        const hash = bcrypt.hashSync(args.password, 8);
        let newAdmin = new User({
            mobile: args.mobile,
            password: hash,
            type: args.type
        })

        let nAdmin = await newAdmin.save()
        let returnData = {
            error: false,
            msg: "Admin Created Successfully",
            data: nAdmin
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Admin Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.adminLogin = async(root, args, context) => {
    
    try{

        let admin = await User.findOne({
            mobile: args.mobile,
            type: 'admin'
        })

        if(!admin){
            let returnData = {
                token: '',
                error: true,
                msg: "Admin Not Found",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, admin.password)

        if(!passMatch){
            let returnData = {
                token: '',
                error: true,
                msg: "Password Not Matched",
                data: {}
            }
            return returnData
        }

        const token = jwt.sign(
            {
                _id: admin._id,
                type: admin.type
            }
            , process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Admin Login Successful",
            data: admin
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Admin Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.verifyToken = async(root, args, context) => {
    
    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'admin'){

            let admin = await User.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: admin
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Token Not Verified",
                data: {}
            }
            return returnData

        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Token Not Verified",
            data: {}
        }
        return returnData

    }
    

}