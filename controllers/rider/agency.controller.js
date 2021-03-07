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
            national_id: args.agencyInput.national_id,
            agency_level: args.agencyInput.agency_level,
            business_name: args.agencyInput.business_name,
            business_location: args.agencyInput.business_location,
            trade_license_no: args.agencyInput.trade_license_no,
            trade_license_img: args.agencyInput.trade_license_img,
            type: 'agency',
            password: hash,
            status: "pending",
            rejection_msg: "Your Request is in Pending Mode.......",
        }

        if(args.agencyInput.agency_level === 'residential'){
            agency = {
                ...agency,
                division: args.agencyInput.division,
                district: args.agencyInput.district,
                upazila: args.agencyInput.upazila,
                union: args.agencyInput.union,
                agency_areas: args.agencyInput.agency_areas
            }
        }else{
            agency = {
                ...agency,
                division: args.agencyInput.division,
                district: args.agencyInput.district,
                municipal: args.agencyInput.municipal,
                agency_areas: args.agencyInput.agency_areas
            }
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

        if (error.code === 11000 && error.keyPattern.mobile) {
            let returnData = {
                error: true,
                msg: 'Mobile Number Already Exists',
                data: {}
            }
            return returnData
        }

        let returnData = {
            error: true,
            msg: "Server Failure",
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
                msg: "Agency Not Found",
                data: {}
            }
            return returnData
        }

        if(rider.status !== 'approved' ){
            let returnData = {
                token: '',
                error: true,
                msg: rider.rejection_msg,
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

exports.getAllAgencies = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }

    try{
        let query = {
            type: 'agency'
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let options = {
            pagination: false,
            sort: {createdAt: -1}
        }
        if(args.page !== 0){
            options = {
                page: +args.page,
                limit: +args.pagesize,
                sort: {createdAt: -1}
            }
        }

        let agencies = await User.paginate(query,options)

        if(agencies.totalDocs === 0){
            let returnData = {
                error: true,
                msg: "No data available",
                data: {
                    docs: agencies.docs,
                    totalDocs: agencies.totalDocs
                }
            }
            return returnData
        }
    
        let returnData = {
            error: false,
            msg: "Agency Get Successfully",
            data: {
                docs: agencies.docs,
                totalDocs: agencies.totalDocs
            }
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agency Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOneAgency = async(root, args, context) => {

    try{

        let agency = await User.findById(args._id)

        let returnData = {
            error: false,
            msg: "Agency Get Successfully",
            data: agency
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agency Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.updateAgencyWithStatus = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }

    try{

        let updateArgs = {
            _id: args.agencyInput._id
        }

        let upRider = {
            first_name: args.agencyInput.first_name,
            last_name: args.agencyInput.last_name,
            mobile: args.agencyInput.mobile,
            email: args.agencyInput.email,
            national_id: args.agencyInput.national_id,
            status: args.agencyInput.status,
            rejection_msg: args.agencyInput.rejection_msg,
            business_name: args.agencyInput.business_name,
            business_location: args.agencyInput.business_location,
            trade_license_no: args.agencyInput.trade_license_no,
            trade_license_img: args.agencyInput.trade_license_img,
        }

        if(args.agencyInput.password !== ''){
            const hash = bcrypt.hashSync(args.agencyInput.password, 8)
            upRider.password = hash
        }

        let uRider = await User.updateOne(updateArgs,upRider)

        if(uRider.n > 0){

            let returnData = {
                error: false,
                msg: "Agency Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Agency Status Update Unsuccessful"
            }
            return returnData
        }


    }catch(error){

        let returnData = {
            error: true,
            msg: "Agency Status Update Unsuccessful"
        }
        return returnData

    }


}
