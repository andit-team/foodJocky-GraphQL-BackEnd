var ObjectId = require('mongodb').ObjectID;
const Restaurant = require('../../models/restaurant.model');

exports.addFood = async (root, args, context) => {
    try {
        let foods = {
            _id: new ObjectId(),
            name: args.foodInput.name,
            description: args.foodInput.description,
            dish_img: args.foodInput.dish_img,
            price: args.foodInput.price,
            commission: args.foodInput.commission,
            pirce_and_size: args.foodInput.pirce_and_size
        };

        let data = Restaurant.findOneAndUpdate(
            { _id: args.foodInput.restaurant_id, 'food_categories._id': args.foodInput.food_categories_id },
            {
                $push: {
                    'food_categories.$.foods': foods
                }
            }
        );
        console.log(data.n)
        if (data.n > 0) {
            let returnData = {
                error: false,
                msg: 'Successfully Added!!',
                data: foods
            };
            return returnData;
        }

        let returnData = {
            error: true,
            msg: 'Error Occured!!1',
            data: {}
        };
        return returnData;
    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Error Occured!!2',
            data: {}
        };
        return returnData;
    }
};

exports.updateFood = async (root, args, context) => {
    // try{
    //     const hash = bcrypt.hashSync(args.ownerInput.password, 8);
    //     let newOwner = new User({
    //         first_name: args.ownerInput.first_name,
    //         last_name: args.ownerInput.last_name,
    //         mobile: args.ownerInput.mobile,
    //         email: args.ownerInput.email,
    //         type: args.ownerInput.type,
    //         owner_address: args.ownerInput.owner_address,
    //         password: hash,
    //         status: "pending",
    //         national_id: args.ownerInput.national_id
    //     })
    //     let nOwner = await newOwner.save();
    //     let returnData = {
    //         error: false,
    //         msg: "Owner Created Successfully",
    //         data: nOwner
    //     }
    //     return returnData
    // }catch(error){
    //     let returnData = {
    //         error: true,
    //         msg: "Mobile Number Already Taken",
    //         data: {}
    //     }
    //     return returnData
    // }
};

exports.deleteFood = async (root, args, context) => {
    // try{
    //     const hash = bcrypt.hashSync(args.ownerInput.password, 8);
    //     let newOwner = new User({
    //         first_name: args.ownerInput.first_name,
    //         last_name: args.ownerInput.last_name,
    //         mobile: args.ownerInput.mobile,
    //         email: args.ownerInput.email,
    //         type: args.ownerInput.type,
    //         owner_address: args.ownerInput.owner_address,
    //         password: hash,
    //         status: "pending",
    //         national_id: args.ownerInput.national_id
    //     })
    //     let nOwner = await newOwner.save();
    //     let returnData = {
    //         error: false,
    //         msg: "Owner Created Successfully",
    //         data: nOwner
    //     }
    //     return returnData
    // }catch(error){
    //     let returnData = {
    //         error: true,
    //         msg: "Mobile Number Already Taken",
    //         data: {}
    //     }
    //     return returnData
    // }
};

exports.getAllFoods = async (root, args, context) => {
    // try{
    //     const hash = bcrypt.hashSync(args.ownerInput.password, 8);
    //     let newOwner = new User({
    //         first_name: args.ownerInput.first_name,
    //         last_name: args.ownerInput.last_name,
    //         mobile: args.ownerInput.mobile,
    //         email: args.ownerInput.email,
    //         type: args.ownerInput.type,
    //         owner_address: args.ownerInput.owner_address,
    //         password: hash,
    //         status: "pending",
    //         national_id: args.ownerInput.national_id
    //     })
    //     let nOwner = await newOwner.save();
    //     let returnData = {
    //         error: false,
    //         msg: "Owner Created Successfully",
    //         data: nOwner
    //     }
    //     return returnData
    // }catch(error){
    //     let returnData = {
    //         error: true,
    //         msg: "Mobile Number Already Taken",
    //         data: {}
    //     }
    //     return returnData
    // }
};

exports.getOneFood = async (root, args, context) => {
    // try{
    //     const hash = bcrypt.hashSync(args.ownerInput.password, 8);
    //     let newOwner = new User({
    //         first_name: args.ownerInput.first_name,
    //         last_name: args.ownerInput.last_name,
    //         mobile: args.ownerInput.mobile,
    //         email: args.ownerInput.email,
    //         type: args.ownerInput.type,
    //         owner_address: args.ownerInput.owner_address,
    //         password: hash,
    //         status: "pending",
    //         national_id: args.ownerInput.national_id
    //     })
    //     let nOwner = await newOwner.save();
    //     let returnData = {
    //         error: false,
    //         msg: "Owner Created Successfully",
    //         data: nOwner
    //     }
    //     return returnData
    // }catch(error){
    //     let returnData = {
    //         error: true,
    //         msg: "Mobile Number Already Taken",
    //         data: {}
    //     }
    //     return returnData
    // }
};
