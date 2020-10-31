const User = require('../../models/user.model')
const Restaurant = require('../../models/restaurant.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addRestaurant = async(root, args, context) => {
    
    try{
        const hash = bcrypt.hashSync(args.RestaurantInput.password, 8);
        let newRestaurant = new User({
            first_name: args.RestaurantInput.first_name,
            last_name: args.RestaurantInput.last_name,
            mobile: args.RestaurantInput.mobile,
            email: args.RestaurantInput.email,
            type: args.RestaurantInput.type,
            Restaurant_address: args.RestaurantInput.Restaurant_address,
            password: hash,
            status: "pending"
        })

        let nRestaurant = await newRestaurant.save();

        let returnData = {
            error: false,
            msg: "Restaurant Created Successfully",
            data: nRestaurant
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

exports.restaurantLogin = async(root, args, context) => {
    
    try{

        let Restaurant = await User.findOne({
            mobile: args.mobile,
            type: 'Restaurant'
        })

        if(!Restaurant){
            let returnData = {
                token: '',
                error: true,
                msg: "Restaurant Not Found",
                data: {}
            }
            return returnData
        }

        if(Restaurant.status !== 'approved'){
            let returnData = {
                token: '',
                error: true,
                msg: "Restaurant Not Approved",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, Restaurant.password)

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
                _id: Restaurant._id,
                type: Restaurant.type
            }
            , process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Restaurant Login Successful",
            data: Restaurant
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.updateRestaurant = async(root, args, context) => {

    if(context.user.error !== false && context.user.type !== 'Restaurant'){

        let returnData = {
            error: true,
            msg: "Restaurant Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateArgs = {
            _id: context.user.user_id
        }

        let upRestaurant = {
            first_name: args.RestaurantInput.first_name,
            last_name: args.RestaurantInput.last_name,
            mobile: args.RestaurantInput.mobile,
            email: args.RestaurantInput.email,
            Restaurant_address: args.RestaurantInput.Restaurant_address,
        }

        if(args.RestaurantInput.password !== ''){
            const hash = bcrypt.hashSync(args.RestaurantInput.password, 8);
            upRestaurant.password = hash
        }

        let uRestaurant = await User.updateOne(updateArgs,upRestaurant)

        if(uRestaurant.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Restaurant Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Update Unsuccessful"
        }
        return returnData

    }
    

}

exports.deleteRestaurant = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let RestaurantDelete = await User.deleteOne(deleteArgs)
        if(RestaurantDelete.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Restaurant Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getAllRestaurantsByAdmin = async(root, args, context) => {

  // todo
}

exports.getAllRestaurantsByOwner = async(root, args, context) => {
  // todo
}

exports.getOneRestaurant = async(root, args, context) => {

    // todo

}


exports.updateRestaurantStatus = async(root, args, context) => {

    if(context.user.error !== false && context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateArgs = {
            _id: args._id
        }

        let upRestaurant = {
            status: args.status,
        }

        let uRestaurant = await User.updateOne(updateArgs,upRestaurant)

        if(uRestaurant.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Restaurant Status Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Status Update Unsuccessful"
        }
        return returnData

    }
    

}