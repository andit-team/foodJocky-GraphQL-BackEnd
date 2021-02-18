const User = require('../../models/user.model')
const Settings = require('../../models/settings.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID;
const Order = require('../../models/order.model')
const axios = require('axios')
const Category = require('../../models/category.model')

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

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try {
        let updateArgs = {
            email: args.customerInput.email,
            first_name: args.customerInput.first_name,
            last_name: args.customerInput.last_name,
        }

        if(args.customerInput.password !== ''){
            const hash = bcrypt.hashSync(args.customerInput.password, 8)
            updateArgs.password = hash
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

exports.updateCustomerProfilePicture = async (root, args, context) => {
    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }
    try {
        let updateArgs = {
            profile_picture: args.profile_picture
        }

        let query = {
            _id: context.user.user_id
        }

        let nUser = await User.updateOne(query,updateArgs)

        if(nUser.n > 0){

            let returnData = {
                error: false,
                msg: 'Successfully Updated Customer Profile Picture'
            }
            return returnData

        }else {

            let returnData = {
                error: true,
                msg: 'Problem in Updating Customer Profile Picture'
            }
            return returnData

        }

    } catch (error) {

        let returnData = {
            error: true,
            msg: 'Problem in Updating Customer Profile Picture'
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
        }).sort({createdAt: -1})

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

exports.getCustomerDashboardData = async(root, args, context) => {

    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try{
        let query = {
            customer: context.user.user_id
        }

        let orders = await Order.find(query).sort({createdAt: -1}).populate('restaurant').populate('customer').populate('agent')
        let totalOrders = await Order.count(query)
        query = {
            ...query,
            status: 'pending'
        }
        let pendingOrders = await Order.count(query)

        let nData = {
            totalOrders: totalOrders,
            pendingOrders: pendingOrders,
            orders: orders
        }

        let returnData = {
            error: false,
            msg: "Orders Get Successfully",
            data: nData
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Orders Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.customerLogin = async(root, args, context) => {
    
    try{

        let customer = await User.findOne({
            mobile: args.mobile,
            type: 'customer'
        }).populate('last_order')

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

            let customer = await User.findById(decodedToken._id).populate('last_order')
            
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

exports.getDistanceFromLatLng = async(root, args, context) => {
    
    try{

        let setting = await Settings.findOne({})

        const apiKey = setting.google_map_api_key
        
        let result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${args.customer_lat},${args.customer_lng}&destinations=${args.restaurant_lat},${args.restaurant_lng}&key=${apiKey}`)
        
        if(result.data.status === 'OK'){
            if(result.data.rows[0].elements[0].status === 'OK'){
                let returnData = {
                    error: false,
                    msg: "Distance get successfully",
                    data: {
                        distance: Math.ceil(result.data.rows[0].elements[0].distance.value / 1000)
                    }
                }
                return returnData
            }else{
                let returnData = {
                    error: true,
                    msg: "Distance data get unsuccessful Error From 1",
                    data: {}
                }
                return returnData
            }
            
        }else{
            let returnData = {
                error: true,
                msg: "Distance data get unsuccessful Error From 2",
                data: {}
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Distance data get unsuccessful Error From Catch",
            data: {}
        }
        return returnData

    }
    

}

exports.getHomePageData = async (root, args, context) => {
    try {

        let data = await Category.aggregate([
            {
                $match: {
                    image_url: { "$exists": true }
                }
            },
            {
                $lookup: {
                    from: 'restaurants',
                    let: { "id": "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$$id", "$food_categories._id"
                                    ]
                                }
                            }
                        }
                        
                    ],
                    as: "restaurants"
                }
            },
            {
                $project: {
                    _id: 1,
                    restaurant_count: {$size: '$restaurants'},
                    image_url: 1,
                    name: 1
                }
            }
        ])

        let returnData = {
            error: false,
            msg: 'Successfully Send HomePage Data',
            data: {
                populat_category: data
            }
        }
        return returnData

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in Sending HomePage Data',
            data: {}
        }
        return returnData
    }
}