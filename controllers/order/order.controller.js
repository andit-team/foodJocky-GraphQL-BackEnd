const User = require('../../models/user.model')
const Restaurant = require('../../models/restaurant.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addOrder = async(root, args, context) => {
   
    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
            data: {}
        }
        return returnData

    }

    try{

        let restaurant = await Restaurant.findById(args.orderInput.restaurant)
        let order = {
            items: args.orderInput.items,
            total: args.orderInput.total,
            restaurant: args.orderInput.restaurant,
            customer: context.user.user_id,
            agent: restaurant.agent,
            
        }

        let newRestaurant = new Restaurant(resData)

        let nRestaurant = await newRestaurant.save()

        let returnData = {
            error: false,
            msg: "Restaurant Created Successfully",
            data: nRestaurant
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Create Failed",
            data: {}
        }
        return returnData

    }
    

}