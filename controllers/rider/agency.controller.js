const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addAgency = async(root, args, context) => {

    try{
        const hash = bcrypt.hashSync(args.agencyInput.password, 8)

        let agency = {
            first_name: args.agencyInput.first_name,
            last_name: args.agencyInput.last_name,
            mobile: args.agencyInput.mobile,
            email: args.agencyInput.email,
            type: 'agency',
            password: hash,
            status: "approved",
        }

        let newAgency = new User(agency);

        let nAgency = await newAgency.save()

        let returnData = {
            error: false,
            msg: "Agency Created Successfully",
            data: nAgency
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Mobile Number Already Taken",
            data: {}
        }
        return returnData

    }


}

exports.agencyLogin = async(root, args, context) => {

    try{

        let rider = await User.findOne({
            mobile: args.mobile,
            type: 'agency'
        })

        if(!rider){
            let returnData = {
                token: '',
                error: true,
                msg: "Rider Not Found",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, rider.password)

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
                _id: rider._id,
                type: rider.type
            }, process.env.SECRET,
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Agency Login Successful",
            data: rider
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agency Login UnSuccessful",
            data: {}
        }
        return returnData

    }


}

exports.verifyAgencyToken = async(root, args, context) => {

    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'agency'){

            let rider = await User.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: rider
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
