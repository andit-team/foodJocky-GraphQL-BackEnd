const Plan = require('../../models/plan.model')

exports.addPlan = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let newPlan = new Plan({
            title: args.planInput.title,
            commision: +args.planInput.commision,
            feature: args.planInput.feature
        })

        let nPlan = await newPlan.save()
        let returnData = {
            error: false,
            msg: "Plan Created Successfully",
            data: nPlan
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Plan Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.deletePlan = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let deleteArgs = {
            _id: args._id
        }

        let deletedData = await Plan.deleteOne(deleteArgs)

        if( deletedData.n > 0){

            let returnData = {
                error: false,
                msg: "Plan Deleted Successfully"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Plan Deletion UnSuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Plan Deletion UnSuccessful",
        }
        return returnData

    }
    

}

exports.updatePlan = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateArgs = {
            title: args.updatePlanInput.title,
            commision: +args.updatePlanInput.commision,
            feature: args.updatePlanInput.feature
        }

        let result = await Plan.updateOne({_id: args.updatePlanInput._id}, updateArgs)

        if( result.n > 0){

            let returnData = {
                error: false,
                msg: "Plan Updated Successfully"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Plan Updation UnSuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Plan Updation UnSuccessful",
        }
        return returnData

    }
    

}


exports.getAllPlans = async(root, args, context) => {

    try{

        let plans = Plan.find({}).sort({createdAt: -1})

        let returnData = {
            error: false,
            msg: "Plan Get Successfully",
            data: plans
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Plan Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOnePlan = async(root, args, context) => {

    try{

        let plan = Plan.findOne({_id: args._id})

        let returnData = {
            error: false,
            msg: "Plan Get Successfully",
            data: plan
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Plan Get UnSuccessful",
            data: []
        }
        return returnData

    }

}