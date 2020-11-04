const User = require('../../models/user.model')

exports.addCustomer = async (root, args, context) => {
    try {
        let user = new User({
            mobile: args.CustomerInput.mobile,
            email: args.CustomerInput.email,
            password: args.CustomerInput.password,
            first_name: args.CustomerInput.first_name,
            last_name: args.CustomerInput.last_name,
            type: 'customer'
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
    try {
        let updateArgs = {
            mobile: args.CustomerInput.mobile,
            email: args.CustomerInput.email,
            password: args.CustomerInput.password,
            first_name: args.CustomerInput.first_name,
            last_name: args.CustomerInput.last_name,
        }

        let query = {
            _id: context.user.user_id
        }

        let nUser = await User.updateOne(query,updateArgs)

        if(nUser.n > 0){

            let returnData = {
                error: false,
                msg: 'Successfully Updated Customer'
            };
            return returnData;

        }else {

            let returnData = {
                error: true,
                msg: 'Problem in Updating Customer'
            }
            return returnData;

        }

    } catch (error) {

        let returnData = {
            error: true,
            msg: 'Problem in Updating Customer'
        }
        return returnData;
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
    try {
        let customers = await User.find({
            type: 'customer'
        })

        if(customers){

            let returnData = {
                error: false,
                msg: 'Successfully Get Customer',
                data: customers
            };
            return returnData;

        }else{

            let returnData = {
                error: true,
                msg: 'Problem in Getting Data',
                data: []
            }
            return returnData;

        }
        

    } catch (error) {

        let returnData = {
            error: true,
            msg: 'Problem in Getting Data',
            data: []
        }
        return returnData;

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

exports.updateCustomerLocation = async (root, args, context) => {
    try {
        let cUpdate = await User.findOneAndUpdate({
            _id: context.user.user_id
        },
        {
            $push: {
                addresses: args.address
            },
            location: {
                type: "Point",
                coordinates: [
                    args.address.location.lng,
                    args.address.location.lat
                ]
            }
        }
        )

        let returnData = {
            error: false,
            msg: 'Successfully Updated Location'
        }
        return returnData

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in Updating Location'
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
            }
            , process.env.SECRET, 
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