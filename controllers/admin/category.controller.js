const Category = require('../../models/category.model')

exports.addCategory = async(root, args, context) => {


    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let newCategoy = new Category({
            name: args.name,
            image_url: args.image_url
        })

        let nCategoy = await newCategoy.save()
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

exports.updateCategory = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }

    try{

        let categoryUpdate = await Category.updateOne({_id: args._id},{name: args.name, image_url: args.image_url})
        if(categoryUpdate.n > 0){

            let returnData = {
                error: false,
                msg: "Category Update Successfully"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Category Not Deleted"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Category Not Deleted"
        }
        return returnData

    }

}

exports.getAllCategories = async(root, args, context) => {

    try{
        const query = {}
        let options = {
            pagination: false,
            sort: {createdAt: -1}
        }
        if(args.page !== 0){
            options = {
                page: +args.page,
                limit: +args.pagesize,
                sort: {createdAt: -1}
            }
        }
        

        let categories = await Category.paginate(query,options)

        if(categories.totalDocs === 0){
            let returnData = {
                error: true,
                msg: "No data available",
                data: {
                    docs: categories.docs,
                    totalDocs: categories.totalDocs
                }
            }
            return returnData
        }

        let returnData = {
            error: false,
            msg: "Category Get Successfully",
            data: {
                docs: categories.docs,
                totalDocs: categories.totalDocs
            }
        }
        return returnData

    }catch(error){
        let returnData = {
            error: true,
            msg: "Category Get UnSuccessful",
            data: {}
        }
        return returnData
    }
}