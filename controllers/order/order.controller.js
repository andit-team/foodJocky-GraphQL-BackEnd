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
            agent: restaurant.agent,
            status: 'pending'
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