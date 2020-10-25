const Category = require('../../models/category.model')

exports.addCategory = async(root, args, context) => {
    
    try{

        let newCategoy = new Category({
            name: args.name
        })

        let nCategoy = await newCategoy.save();
        let returnData = {
            error: false,
            msg: "Category Created Successfully",
            data: nCategoy
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Category Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.deleteCategory = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let categoryDelete = await Category.deleteOne(deleteArgs);
        if((categoryDelete).n > 0){

            let returnData = {
                error: false,
                msg: "Category Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Category Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Category Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getAllCategories = async(root, args, context) => {

    try{

        let categoies = Category.find({});

        let returnData = {
            error: false,
            msg: "Category Get Successfully",
            data: categoies
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Category Get UnSuccessful",
            data: []
        }
        return returnData

    }

}