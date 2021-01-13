const Settings = require('../../models/settings.model')

exports.addDeliveryCharge = async(root, args, context) => {
    
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