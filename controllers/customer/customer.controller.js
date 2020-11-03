const User = require('../../models/user.model')

exports.addCustomer = async (root, args, context) => {
    try {
        let user = new User({
            mobile: args.CustomerInput.mobile,
            email: args.CustomerInput.email,
            password: args.CustomerInput.password,
            first_name: args.CustomerInput.first_name,
            last_name: args.CustomerInput.last_name
        })

        let data = await user.save()

        let returnData = {
            error: false,
            msg: 'Successfully Added Customer',
            data: data
        };
        return returnData;

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in adding Customer',
            data: {}
        }
        return returnData;
    }
}

exports.updateCustomer = async (root, args, context) => {
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
    //     };
    //     return returnData;

    // } catch (error) {
    //     let returnData = {
    //         error: true,
    //         msg: 'Problem in adding Food',
    //         data: {}
    //     }
    //     return returnData;
    // }
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
    //     };
    //     return returnData;

    // } catch (error) {
    //     let returnData = {
    //         error: true,
    //         msg: 'Problem in adding Food',
    //         data: {}
    //     }
    //     return returnData;
    // }
}

exports.getAllCustomers = async (root, args, context) => {
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
    //     };
    //     return returnData;

    // } catch (error) {
    //     let returnData = {
    //         error: true,
    //         msg: 'Problem in adding Food',
    //         data: {}
    //     }
    //     return returnData;
    // }
}

exports.getOneCustomer = async (root, args, context) => {
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
    //     };
    //     return returnData;

    // } catch (error) {
    //     let returnData = {
    //         error: true,
    //         msg: 'Problem in adding Food',
    //         data: {}
    //     }
    //     return returnData;
    // }
}