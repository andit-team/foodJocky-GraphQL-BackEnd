const User = require('../../models/user.model')

exports.addOwner = async(root, args, context) => {
    
    try{

        let newOwner = new User({
            first_name: args.first_name,
            last_name: args.last_name,
            mobile: args.mobile,
            email: args.email,
            mobile: args.mobile,
            type: args.type,
            address: args.address,
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
            msg: "Owner Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.updateOwner = async(root, args, context) => {
    
    try{

        let updateArgs = {
            _id: args._id
        }

        let upOwner = new User({
            first_name: args.first_name,
            last_name: args.last_name,
            mobile: args.mobile,
            email: args.email,
            mobile: args.mobile,
            type: args.type,
            address: args.address,
            status: args.status
        })

        // update
        let uOwner = await upOwner.update();

        let returnData = {
            error: false,
            msg: "Owner Created Successfully",
            data: nOwner
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.deleteOwner = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let OwnerDelete = await Owner.deleteOne(deleteArgs);
        if((OwnerDelete).n > 0){

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

        let owners = Owner.find({});

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