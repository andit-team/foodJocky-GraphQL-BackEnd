const AgentAreaPlan = require('../../models/agent.area.plan.model')

exports.addAgentAreaPlan = async(root, args, context) => {


    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let newAgentAreaPlan = new AgentAreaPlan({
            name: args.name,
            key: args.key,
            own_commission: args.own_commission,
            child_commission: args.child_commission
        })

        let nAgentAreaPlan = await newAgentAreaPlan.save()
        let returnData = {
            error: false,
            msg: "AgentAreaPlan Created Successfully",
            data: nAgentAreaPlan
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "AgentAreaPlan Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.deleteAgentAreaPlan = async(root, args, context) => {

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
        let AgentAreaPlanDelete = await AgentAreaPlan.deleteOne(deleteArgs)
        if(AgentAreaPlanDelete.n > 0){

            let returnData = {
                error: false,
                msg: "AgentAreaPlan Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "AgentAreaPlan Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "AgentAreaPlan Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getOneAgentAreaPlan = async(root, args, context) => {

    try{

        let agentAreaPlan = await AgentAreaPlan.findById(args._id)

        let returnData = {
            error: false,
            msg: "AgentAreaPlan Get Successfully",
            data: agentAreaPlan
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "AgentAreaPlan Get UnSuccessful",
            data: {}
        }
        return returnData

    }

}

exports.updateAgentAreaPlan = async(root, args, context) => {

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
            _id: args._id
        }
        let updateData = {
            name: args.name,
            key: args.key,
            own_commission: args.own_commission,
            child_commission: args.child_commission
        }
        let AgentAreaPlanDelete = await AgentAreaPlan.updateOne(updateArgs,updateData)
        if(AgentAreaPlanDelete.n > 0){

            let returnData = {
                error: false,
                msg: "AgentAreaPlan Updated Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "AgentAreaPlan Update UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "AgentAreaPlan Update UnSuccessful"
        }
        return returnData

    }

}

exports.getAllAgentAreaPlan = async(root, args, context) => {

    try{

        let agentAreaPlans = await AgentAreaPlan.find({})

        let returnData = {
            error: false,
            msg: "AgentAreaPlans Get Successfully",
            data: agentAreaPlans
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "AgentAreaPlans Get UnSuccessful",
            data: []
        }
        return returnData

    }

}