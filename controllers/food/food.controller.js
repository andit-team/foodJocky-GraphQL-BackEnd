var ObjectId = require('mongodb').ObjectID
const Restaurant = require('../../models/restaurant.model')

exports.addFood = async (root, args, context) => {
    try {
        let foods = {
            _id: new ObjectId(),
            name: args.foodInput.name,
            description: args.foodInput.description,
            dish_img: args.foodInput.dish_img,
            price: args.foodInput.price,
            commission: args.foodInput.commission,
            price_and_size: args.foodInput.price_and_size
        }

        let data = await Restaurant.findOneAndUpdate(
            { _id: args.foodInput.restaurant_id, 'food_categories._id': args.foodInput.food_categories_id },
            {
                $push: {
                    'food_categories.$.foods': foods
                }
            }
        )

        let returnData = {
            error: false,
            msg: 'Successfully Added Food',
            data: foods
        };
        return returnData;

    } catch (error) {
        let returnData = {
            error: true,
            msg: 'Problem in adding Food',
            data: {}
        }
        return returnData;
    }
}

exports.updateFood = async (root, args, context) => {
    try{
        let data = await Restaurant.findOneAndUpdate({_id: args.foodInput.restaurant_id}, {
            $set: 
            {
                'food_categories.$[categoryid].foods.$[foodid].name':args.foodInput.name,
                'food_categories.$[categoryid].foods.$[foodid].description':args.foodInput.description,
                'food_categories.$[categoryid].foods.$[foodid].dish_img':args.foodInput.dish_img,
                'food_categories.$[categoryid].foods.$[foodid].price':args.foodInput.price,
                'food_categories.$[categoryid].foods.$[foodid].commission':args.foodInput.commission,
                'food_categories.$[categoryid].foods.$[foodid].price_and_size':args.foodInput.price_and_size
            },      
        },
        {
            arrayFilters: [
                {
                    'categoryid._id': args.foodInput.food_categories_id
                },
                {
                    'foodid._id': args.foodInput._id
                }
            ],
            multi: true
        }
        )
        let returnData = {
            error: false,
            msg: "Food Update Successfully",
        }
        return returnData
    }catch(error){
        let returnData = {
            error: true,
            msg: "Food Update Unsuccessful",
        }
        return returnData
    }
}

exports.deleteFood = async (root, args, context) => {
    try{
        let data = await Restaurant.findOneAndUpdate({_id: args.foodParams.restaurant_id, 'food_categories._id': args.foodParams.food_categories_id}, {
            $pull: {
                'food_categories.$.foods': {
                    _id: args.foodParams._id
                }
            }
                
        })
        let returnData = {
            error: false,
            msg: "Food Delete Successfull"
        }
        return returnData
    }catch(error){
        let returnData = {
            error: true,
            msg: "Problem in deleting food",
        }
        return returnData
    }
};

exports.getAllFoods = async(root, args, context) => {

    if(context.user.type !== 'owner'){

        let returnData = {
            error: true,
            msg: "Owner Login Required",
            data: []
        }
        return returnData

    }
    
    try{
        let foodCategories = await Restaurant.find({
            owner: context.user.user_id
        },
        {
            name: 1,
            food_categories: 1  
        })
            
        let returnData = {
            error: false,
            msg: "Food Get Successfully",
            data: foodCategories
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Food Get UnSuccessfully",
            data: []
        }
        return returnData

    }
    

}

exports.getAllFoodsByAdmin = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: []
        }
        return returnData

    }
    
    try{
        let foodCategories = await Restaurant.find({
            owner: args.owner_id
        },
        {
            name: 1,
            food_categories: 1  
        })
            
        let returnData = {
            error: false,
            msg: "Food Get Successfully",
            data: foodCategories
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Food Get UnSuccessfully",
            data: []
        }
        return returnData

    }
    

}

exports.getOneFood = async(root, args, context) => {
    
    try{

        let foods = await Restaurant.findOne(
            {
                _id: args.foodParams.restaurant_id,
                food_categories: {
                    $elemMatch: {
                        _id: args.foodParams.food_categories_id,
                        foods: {
                            $elemMatch: {
                                _id: args.foodParams._id
                            }
                        }
                    }
                },
            },
            {
                'food_categories.$.foods': 1 
            })
            if(foods !== null){

                let foodsarr = foods.food_categories[0].foods;
                let food = {}
                foodsarr.map(result => {
                    if(result._id == args.foodParams._id){
                        food = result
                    }
                    
                })

                let returnData = {
                    error: false,
                    msg: "Food Get Successfully",
                    data: food
                }
                return returnData

            }else {

                let returnData = {
                    error: true,
                    msg: "Food Get UnSuccessfully",
                    data: {}
                }
                return returnData

            }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Food Get UnSuccessfully",
            data: {}
        }
        return returnData

    }
    

}
