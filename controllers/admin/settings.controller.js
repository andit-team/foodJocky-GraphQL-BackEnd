const Settings = require('../../models/settings.model')

exports.addDeliveryCharge = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let delivery_charge = await Settings.findOne({},{delivery_charge: 1})
        let data = {}
        let message = ''
        if(!delivery_charge){

            let newDeliveryCharge = new Settings({
                delivery_charge: args.amount
            })
            data = await newDeliveryCharge.save()
            message = "Delivery Charge Added Successfully"
        }else{

            let updateDeliveryCharge = await Settings.updateOne({},{delivery_charge: args.amount})
            if(updateDeliveryCharge.n > 0){
                data = await Settings.findOne({},{delivery_charge: 1})
                message = "Delivery Charge Updated Successfully"
            }else{
                message = "Delivery Charge Update Unsuccessful"
                let returnData = {
                    error: true,
                    msg: message,
                    data: data
                }
                return returnData
            }
        }
        
        let returnData = {
            error: false,
            msg: message,
            data: data
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Delivery Charge Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.getSettings = async(root, args, context) => {
    
    try{

        let delivery_charge = await Settings.findOne({},{delivery_charge: 1})
        if(delivery_charge){
            let returnData = {
                error: false,
                msg: 'Settings Get Successfully',
                data: delivery_charge
            }
            return returnData
        }else{
            let returnData = {
                error: true,
                msg: 'No Data Available',
                data: delivery_charge
            }
            return returnData
        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Delivery Charge Get UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}