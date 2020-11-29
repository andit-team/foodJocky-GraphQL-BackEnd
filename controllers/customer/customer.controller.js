const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID;

exports.addCustomer = async (root, args, context) => {
    try {
        const hash = bcrypt.hashSync(args.customerInput.password, 8)
        let user = new User({
            mobile: args.customerInput.mobile,
            email: args.customerInput.email,
            password: hash,
            first_name: args.customerInput.first_name,
            last_name: args.customerInput.last_name,
            type: 'customer'
        })

        let data = await user.save()
        const token = jwt.sign(
            {
                _id: data._id,
                type: data.type
            }, process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: 'Successfully Added Customer',
            data: data
        }
        return returnData

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in adding Customer',
            data: {}
        }
        return returnData
    }
}

exports.updateCustomer = async (root, args, context) => {
    try {
        let updateArgs = {
            mobile: args.customerInput.mobile,
            email: args.customerInput.email,
            password: args.customerInput.password,
            first_name: args.customerInput.first_name,
            last_name: args.customerInput.last_name,
        }

        let query = {
            _id: context.user.user_id
        }

        let nUser = await User.updateOne(query,updateArgs)

        if(nUser.n > 0){

            let returnData = {
                error: false,
                msg: 'Successfully Updated Customer'
            }
            return returnData

        }else {

            let returnData = {
                error: true,
                msg: 'Problem in Updating Customer'
            }
            return returnData

        }

    } catch (error) {

        let returnData = {
            error: true,
            msg: 'Problem in Updating Customer'
        }
        return returnData
    }
}

exports.deleteCustomer = async (root, args, context) => {
    // try {
    //     let foods = {
    //         _id: new ObjectId(),
    //         mobile: args.customerInput.mobile,
    //         description: args.customerInput.description,
    //         dish_img: args.customerInput.dish_img,
    //         price: args.customerInput.price,
    //         commission: args.customerInput.commission,
    //         price_and_size: args.customerInput.price_and_size
    //     }

    //     let data = await Restaurant.findOneAndUpdate(
    //         { _id: args.customerInput.restaurant_id, 'food_categories._id': args.customerInput.food_categories_id },
    //         {
    //             $push: {
    //                 'food_categories.$.foods': foods
    //             }
    //         }
    //     )

    //     let returnData = {
    //         error: false,
    //         msg: 'Successfully Added Food',
    //         data: foods
    //     }
    //     return returnData

    // } catch (error) {
    //     let returnData = {
    //         error: true,
    //         msg: 'Problem in adding Food',
    //         data: {}
    //     }
    //     return returnData
    // }
}

exports.getAllCustomers = async (root, args, context) => {
    try {
        let customers = await User.find({
            type: 'customer'
        })

        if(customers){

            let returnData = {
                error: false,
                msg: 'Successfully Get Customer',
                data: customers
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: 'Problem in Getting Data',
                data: []
            }
            return returnData

        }
        

    } catch (error) {

        let returnData = {
            error: true,
            msg: 'Problem in Getting Data',
            data: []
        }
        return returnData

    }
}

exports.getOneCustomer = async (root, args, context) => {
    try {
        let customer = await User.findById({
            _id: context.user.user_id
        })

        if(customer){

            let returnData = {
                error: false,
                msg: 'Successfully get Customer',
                data: customer
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: 'Problem in Getting Customer',
                data: {}
            }
            return returnData

        }

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in Getting Customer',
            data: {}
        }
        return returnData
    }
}

exports.addCustomerLocation = async (root, args, context) => {

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try {
        let address = {
            _id: new ObjectId(),
            title: args.customerAddress.title,
            address: args.customerAddress.address,
            reciver_mobile_no: args.customerAddress.reciver_mobile_no,
            reciver_name: args.customerAddress.reciver_name,
            house_no: args.customerAddress.house_no,
            floor_no: args.customerAddress.floor_no,
            note_to_rider: args.customerAddress.note_to_rider,
            status: 0
        }
        let cUpdate = await User.updateOne({
            _id: context.user.user_id
        },
        {
            $push: {
                customer_addresses: address
            }
        }
        )
        if(cUpdate.n > 0){

            let returnData = {
                error: false,
                msg: 'Successfully Added Location',
                data: address
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: 'Problem in Adding Location'
            }
            return returnData

        }

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in Adding Location'
        }
        return returnData
    }
}

exports.deleteCustomerLocation = async (root, args, context) => {

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try {
        let cUpdate = await User.updateOne({
            _id: context.user.user_id
        },
        {
            $pull: {
                customer_addresses: {
                    _id: args._id
                }
            }
        }
        )

        if(cUpdate.n > 0){

            let returnData = {
                error: false,
                msg: 'Successfully Deleted Location'
            }
            return returnData
            
        }else{

            let returnData = {
                error: true,
                msg: 'Problem in Deleting Location'
            }
            return returnData

        }

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in Deleting Location'
        }
        return returnData
    }
}


exports.getAllCustomerLocations = async (root, args, context) => {

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: []
        }
        return returnData

    }

    try {
        let customerLocation = await User.findOne({_id: context.user.user_id},{_id: 0, customer_addresses: 1})
        let returnData = {
            error: false,
            msg: 'Successfully Get Location',
            data: customerLocation.customer_addresses
        }
        return returnData

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in getting Location',
            data: []
        }
        return returnData
    }
}

exports.customerLogin = async(root, args, context) => {
    
    try{

        let customer = await User.findOne({
            mobile: args.mobile,
        })

        if(!customer){
            let returnData = {
                token: '',
                error: true,
                msg: "Customer Not Found",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, customer.password)

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
                _id: customer._id,
                type: customer.type
            }, process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Customer Login Successful",
            data: customer
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Customer Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.verifyCustomerToken = async(root, args, context) => {
    
    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'customer'){

            let customer = await User.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: customer
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