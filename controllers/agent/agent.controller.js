const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addAgent = async(root, args, context) => {

    try{
        const hash = bcrypt.hashSync(args.agentInput.password, 8)
        
        let agent = {
            first_name: args.agentInput.first_name,
            last_name: args.agentInput.last_name,
            mobile: args.agentInput.mobile,
            email: args.agentInput.email,
            type: 'agent',
            owner_address: args.agentInput.owner_address,
            password: hash,
            status: "pending",
            rejection_msg: "Your Request is in Pending Mode.......",
            national_id: args.agentInput.national_id,
            trade_license_no: args.agentInput.trade_license_no,
        }

        if(args.agentInput.residential_or_municipal === 'residential'){
            agent = {
                ...agent,
                division: args.agentInput.division,
                district: args.agentInput.district,
                upazila: args.agentInput.upazila,
                union: args.agentInput.union,
                village: args.agentInput.village
            }
        } else {
            agent = {
                ...agent,
                division: args.agentInput.division,
                district: args.agentInput.district,
                municipal: args.agentInput.municipal,
                word: args.agentInput.ward
            }
        }

        let newAgent = new User(agent);

        let nAgent = await newAgent.save()

        let returnData = {
            error: false,
            msg: "Agent Created Successfully",
            data: nAgent
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Mobile Number Already Taken",
            data: {}
        }
        return returnData

    }


}

exports.agentLogin = async(root, args, context) => {

    try{

        let agent = await User.findOne({
            mobile: args.mobile,
            type: 'agent'
        })

        if(!agent){
            let returnData = {
                token: '',
                error: true,
                msg: "Agent Not Found",
                data: {}
            }
            return returnData
        }

        if(agent.status !== 'approved' ){
            let returnData = {
                token: '',
                error: true,
                msg: agent.rejection_msg,
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, agent.password)

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
                _id: agent._id,
                type: agent.type
            },
            process.env.SECRET,
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Agent Login Successful",
            data: agent
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agent Login UnSuccessful",
            data: {}
        }
        return returnData

    }


}

exports.updateAgent = async(root, args, context) => {

    // if(context.user.type !== 'rider'){

    //     let returnData = {
    //         error: true,
    //         msg: "Rider Login Required",
    //         data: {}
    //     }
    //     return returnData

    // }

    // try{

    //     let updateArgs = {
    //         _id: context.user.user_id
    //     }

    //     let upRider = {
    //         first_name: args.agentInput.first_name,
    //         last_name: args.agentInput.last_name,
    //     }

    //     if(args.agentInput.password !== ''){
    //         const hash = bcrypt.hashSync(args.agentInput.password, 8)
    //         upRider.password = hash
    //     }

    //     let uRider = await User.updateOne(updateArgs,upRider)

    //     if(uRider.n > 0){

    //         let returnData = {
    //             error: false,
    //             msg: "Owner Updated Successfully"
    //         }
    //         return returnData

    //     }else{
    //         let returnData = {
    //             error: true,
    //             msg: "Owner Update Unsuccessful"
    //         }
    //         return returnData
    //     }


    // }catch(error){

    //     let returnData = {
    //         error: true,
    //         msg: "Owner Update Unsuccessful"
    //     }
    //     return returnData

    // }


}

exports.deleteAgent = async(root, args, context) => {

    // try{
    //     let deleteArgs = {
    //         _id: args._id
    //     }
    //     let OwnerDelete = await User.deleteOne(deleteArgs)
    //     if(OwnerDelete.n > 0){

    //         let returnData = {
    //             error: false,
    //             msg: "Owner Deletion Successful"
    //         }
    //         return returnData

    //     }else{

    //         let returnData = {
    //             error: true,
    //             msg: "Owner Deletion UnSuccessful"
    //         }
    //         return returnData

    //     }

    // }catch(error){

    //     let returnData = {
    //         error: true,
    //         msg: "Owner Deletion UnSuccessful"
    //     }
    //     return returnData

    // }

}

exports.getAllAgents = async(root, args, context) => {

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
            type: 'agent'
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let agents = await User.find(query)

        let returnData = {
            error: false,
            msg: "Agent Get Successfully",
            data: agents
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agent Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOneagent = async(root, args, context) => {

    try{

        let agent = await User.findById(args._id)

        let returnData = {
            error: false,
            msg: "Agent Get Successfully",
            data: agent
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Agent Get UnSuccessful",
            data: []
        }
        return returnData

    }

}


exports.updateAgentWithStatus = async(root, args, context) => {

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
            _id: args.agentInput._id
        }

        let upAgent = {
            first_name: args.agentInput.first_name,
            last_name: args.agentInput.last_name,
            mobile: args.agentInput.mobile,
            email: args.agentInput.email,
            owner_address: args.agentInput.owner_address,
            national_id: args.agentInput.national_id,
            status: args.agentInput.status,
            rejection_msg: args.agentInput.rejection_msg,
            trade_license_no: args.agentInput.trade_license_no,
        }

        if(args.agentInput.password !== ''){
            const hash = bcrypt.hashSync(args.agentInput.password, 8)
            upAgent.password = hash
        }

        let uAgent = await User.updateOne(updateArgs,upAgent)

        if(uAgent.n > 0){

            let returnData = {
                error: false,
                msg: "Agent Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Agent Status Update Unsuccessful"
            }
            return returnData
        }


    }catch(error){

        let returnData = {
            error: true,
            msg: "Agent Status Update Unsuccessful"
        }
        return returnData

    }


}

exports.verifyAgentToken = async(root, args, context) => {

    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'agent'){

            let Agent = await User.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: Agent
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Token Not Verified",
                data: {}
            }
            return returnData

        }


    }catch(error){

        let returnData = {
            error: true,
            msg: "Token Not Verified",
            data: {}
        }
        return returnData

    }


}
