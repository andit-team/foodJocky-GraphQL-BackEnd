const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addOwner = async(root, args, context) => {
    
    try{

        const hash = bcrypt.hashSync(args.ownerInput.password, 8);
        let newOwner = new User({
            first_name: args.ownerInput.first_name,
            last_name: args.ownerInput.last_name,
            mobile: args.ownerInput.mobile,
            email: args.ownerInput.email,
            type: args.ownerInput.type,
            owner_address: args.ownerInput.owner_address,
            password: hash,
            status: "pending"
        })

        let nOwner = await newOwner.save();

        let returnData = {
            error: false,
            msg: "Owner Created Successfully",
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

exports.ownerLogin = async(root, args, context) => {
    
    try{

        let owner = await User.findOne({
            mobile: args.mobile,
            type: 'owner'
        })

        if(owner.status !== 'approved'){
            let returnData = {
                token: '',
                error: true,
                msg: "Owner Not Approved",
                data: {}
            }
            return returnData
        }

        if(!owner){
            let returnData = {
                token: '',
                error: true,
                msg: "owner Not Found",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, owner.password)

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
                _id: owner._id,
                type: owner.type
            }
            , process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "owner Login Successful",
            data: owner
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "owner Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.updateOwner = async(root, args, context) => {
    
    try{

        let updateArgs = {
            _id: args.ownerInput._id
        }

        let upOwner = {
            first_name: args.ownerInput.first_name,
            last_name: args.ownerInput.last_name,
            mobile: args.ownerInput.mobile,
            email: args.ownerInput.email,
            owner_address: args.ownerInput.owner_address,
        }

        let uOwner = await User.updateOne(updateArgs,upOwner)

        if(uOwner.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Owner Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Update Unsuccessful"
        }
        return returnData

    }
    

}

exports.deleteOwner = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let OwnerDelete = await User.deleteOne(deleteArgs)
        if(OwnerDelete.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Owner Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getAllOwners = async(root, args, context) => {

    try{

        let owners = await User.find(
            {
                type: args.type
            })

        let returnData = {
            error: false,
            msg: "Owner Get Successfully",
            data: owners
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOneOwner = async(root, args, context) => {

    try{

        let owner = await User.findById(args._id);

        let returnData = {
            error: false,
            msg: "Owner Get Successfully",
            data: owner
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Get UnSuccessful",
            data: []
        }
        return returnData

    }

}


exports.updateOwnerStatus = async(root, args, context) => {
    
    try{

        let updateArgs = {
            _id: args._id
        }

        let upOwner = {
            status: args.status,
        }

        let uOwner = await User.updateOne(updateArgs,upOwner)

        if(uOwner.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Owner Status Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Status Update Unsuccessful"
        }
        return returnData

    }
    

}