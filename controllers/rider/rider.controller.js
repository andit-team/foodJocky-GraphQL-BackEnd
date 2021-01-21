const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addRider = async(root, args, context) => {

    try{
        const hash = bcrypt.hashSync(args.riderInput.password, 8)


        let rider = {
            first_name: args.riderInput.first_name,
            last_name: args.riderInput.last_name,
            mobile: args.riderInput.mobile,
            email: args.riderInput.email,
            type: 'rider',
            owner_address: args.riderInput.owner_address,
            password: hash,
            status: "pending",
            rejection_msg: "Your Request is in Pending Mode.......",
            national_id: args.riderInput.national_id,
        }

        if(args.riderInput.residential_or_municipal === 'residential'){
            rider = {
                ...rider,
                division: args.riderInput.division,
                district: args.riderInput.district,
                upazila: args.riderInput.upazila,
                union: args.riderInput.union,
                village: args.riderInput.village
            }
        } else {
            rider = {
                ...rider,
                division: args.riderInput.division,
                district: args.riderInput.district,
                municipal: args.riderInput.municipal,
                ward: args.riderInput.ward
            }
        }

        let newRider = new User(rider);

        let nOwner = await newRider.save()

        let returnData = {
            error: false,
            msg: "Rider Created Successfully",
            data: nOwner
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

exports.riderLogin = async(root, args, context) => {

    try{

        let rider = await User.findOne({
            mobile: args.mobile,
            type: 'rider'
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
            msg: "Rider Login Successful",
            data: rider
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Rider Login UnSuccessful",
            data: {}
        }
        return returnData

    }


}

exports.updateRider = async(root, args, context) => {

    // if(context.user.type !== 'rider'){

    //     let returnData = {
    //         error: true,
    //         msg: "Rider Login Required",
    //         data: {}
    //     }
    //     return returnData

    // }

    // try{

    //     let updateArgs = {
    //         _id: context.user.user_id
    //     }

    //     let upRider = {
    //         first_name: args.riderInput.first_name,
    //         last_name: args.riderInput.last_name,
    //     }

    //     if(args.riderInput.password !== ''){
    //         const hash = bcrypt.hashSync(args.riderInput.password, 8)
    //         upRider.password = hash
    //     }

    //     let uRider = await User.updateOne(updateArgs,upRider)

    //     if(uRider.n > 0){

    //         let returnData = {
    //             error: false,
    //             msg: "Owner Updated Successfully"
    //         }
    //         return returnData

    //     }else{
    //         let returnData = {
    //             error: true,
    //             msg: "Owner Update Unsuccessful"
    //         }
    //         return returnData
    //     }


    // }catch(error){

    //     let returnData = {
    //         error: true,
    //         msg: "Owner Update Unsuccessful"
    //     }
    //     return returnData

    // }


}

exports.deleteRider = async(root, args, context) => {

    // try{
    //     let deleteArgs = {
    //         _id: args._id
    //     }
    //     let OwnerDelete = await User.deleteOne(deleteArgs)
    //     if(OwnerDelete.n > 0){

    //         let returnData = {
    //             error: false,
    //             msg: "Owner Deletion Successful"
    //         }
    //         return returnData

    //     }else{

    //         let returnData = {
    //             error: true,
    //             msg: "Owner Deletion UnSuccessful"
    //         }
    //         return returnData

    //     }

    // }catch(error){

    //     let returnData = {
    //         error: true,
    //         msg: "Owner Deletion UnSuccessful"
    //     }
    //     return returnData

    // }

}

exports.getAllRiders = async(root, args, context) => {

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
            type: 'rider'
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let riders = await User.find(query)

        let returnData = {
            error: false,
            msg: "Rider Get Successfully",
            data: riders
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Rider Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOneRider = async(root, args, context) => {

    try{

        let rider = await User.findById(args._id)

        let returnData = {
            error: false,
            msg: "Rider Get Successfully",
            data: rider
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "rider Get UnSuccessful",
            data: []
        }
        return returnData

    }

}


exports.updateRiderWithStatus = async(root, args, context) => {

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
            _id: args.riderInput._id
        }

        let upRider = {
            first_name: args.riderInput.first_name,
            last_name: args.riderInput.last_name,
            mobile: args.riderInput.mobile,
            email: args.riderInput.email,
            owner_address: args.riderInput.owner_address,
            national_id: args.riderInput.national_id,
            status: args.riderInput.status,
            rejection_msg: args.riderInput.rejection_msg
        }

        if(args.riderInput.password !== ''){
            const hash = bcrypt.hashSync(args.riderInput.password, 8)
            upRider.password = hash
        }

        let uRider = await User.updateOne(updateArgs,upRider)

        if(uRider.n > 0){

            let returnData = {
                error: false,
                msg: "Rider Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Rider Status Update Unsuccessful"
            }
            return returnData
        }


    }catch(error){

        let returnData = {
            error: true,
            msg: "Rider Status Update Unsuccessful"
        }
        return returnData

    }


}

exports.verifyRiderToken = async(root, args, context) => {

    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'rider'){

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
