const User = require('../../models/user.model')
const Restaurant = require('../../models/restaurant.model')
const Order = require('../../models/order.model')

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
            agent: restaurant.agent
        }

        if(restaurant.residential_or_municipal === 'residential'){
            order = {
                ...order,
                division: restaurant.division,
                district: restaurant.district,
                upazila: restaurant.upazila,
                union: restaurant.union,
                village: restaurant.village
            }
        }else{
            order = {
                ...order,
                division: restaurant.division,
                district: restaurant.district,
                municipal: restaurant.municipal,
                ward: restaurant.ward
            }
        }

        let newOrder = new Order(order)

        let nOrder = await newOrder.save()

        let newOrderData = await Order.findById(nOrder._id).populate('restaurant').populate('customer').populate('agent')

        let returnData = {
            error: false,
            msg: "Order Placed Successfully",
            data: newOrderData
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Order Place Failed",
            data: {}
        }
        return returnData

    }
    

}

exports.getAllOrdersByRestaurant = async(root, args, context) => {

    if(context.user.type !== 'restaurant'){

        let returnData = {
            error: true,
            msg: "Restaurant Login Required",
            data: {}
        }
        return returnData

    }

    try{
        let query = {
            restaurant: context.user.user_id
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let orders = await Order.find(query)

        let returnData = {
            error: false,
            msg: "Orders Get Successfully",
            data: orders
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

exports.getAllOrdersByAgent = async(root, args, context) => {

    if(context.user.type !== 'agent'){

        let returnData = {
            error: true,
            msg: "Agent Login Required",
            data: {}
        }
        return returnData

    }

    try{
        let query = {
            agent: context.user.user_id
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let orders = await Order.find(query)

        let returnData = {
            error: false,
            msg: "Orders Get Successfully",
            data: orders
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

exports.getAllOrdersByAdmin = async(root, args, context) => {

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
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let orders = await Order.find(query)

        let returnData = {
            error: false,
            msg: "Orders Get Successfully",
            data: orders
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

exports.getAllOrdersByCustomer = async(root, args, context) => {

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

        if(args.status !== ""){
            query.status = args.status
        }

        let orders = await Order.find(query)

        let returnData = {
            error: false,
            msg: "Orders Get Successfully",
            data: orders
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

exports.getOneOrder = async(root, args, context) => {

    try{
        let order = await Order.findById(args._id)

        let returnData = {
            error: false,
            msg: "Order Get Successfully",
            data: order
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Order Get UnSuccessful",
            data: {}
        }
        return returnData

    }

}

exports.updateOrderStatus = async(root, args, context) => {

    try{

        let uOrder = await Order.updateOne({_id: args._id}, {status: args.status})
        if(uOrder.n > 0){

            let order = await Order.findById(args._id).populate('restaurant').populate('customer').populate('agent')

            let returnData = {
                error: false,
                msg: "Order Status Updated Successfully",
                data: order
            }
            return returnData
        }else{
            let returnData = {
                error: true,
                msg: "Order Status Update UnSuccessful",
                data: {}
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Order Status Update UnSuccessful",
            data: {}
        }
        return returnData

    }

}