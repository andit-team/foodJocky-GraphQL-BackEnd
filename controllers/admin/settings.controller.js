const Settings = require('../../models/settings.model')

/**
 * Which Settings We Have Used In this Project Are Given Below
 * 
 * Delivery Charge
 * Customer Cashback Percentange When Add Balance to Wallet
 * Google Map API KEY
 * Rider Extra Time
 * Restaurant Extra Time
 * SSL Commerez => store_id
 * SSL Commerez => store_passwd
 * SSL Commerez => currency
 * SSL Commerez => cus_city
 * SSL Commerez => cus_country
 * Customer Vat
 * Restaurant Vat
 * SMS Api URL
 * SMS Api username
 * SMS Api password
 */

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

exports.addCustomerCashbackPercentange = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let customerCashBackPercentange = await Settings.findOne({},{customer_cashback_percentange: 1})
        let data = {}
        let message = ''
        if(!customerCashBackPercentange){

            let newCustomerCashBackPercentange = new Settings({
                customer_cashback_percentange: args.customer_cashback_percentange
            })
            data = await newCustomerCashBackPercentange.save()
            message = "Customer Cashback Percentange Added Successfully"
        }else{

            let updateCustomerCashBackPercentange = await Settings.updateOne({},{customer_cashback_percentange: args.customer_cashback_percentange})
            if(updateCustomerCashBackPercentange.n > 0){
                data = await Settings.findOne({},{customer_cashback_percentange: 1})
                message = "Customer Cashback Percentange Updated Successfully"
            }else{
                message = "Customer Cashback Percentange Update Unsuccessful"
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
            msg: "Customer Cashback Percentange Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addGoogleMapApiKey = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let googleMapApiKey = await Settings.findOne({},{google_map_api_key: 1})
        let data = {}
        let message = ''
        if(!googleMapApiKey){

            let newGoogleMapApiKey = new Settings({
                google_map_api_key: args.google_map_api_key
            })
            data = await newGoogleMapApiKey.save()
            message = "Google Map Api Key Added Successfully"
        }else{

            let updateGoogleMapApiKey = await Settings.updateOne({},{google_map_api_key: args.google_map_api_key})
            if(updateGoogleMapApiKey.n > 0){
                data = await Settings.findOne({},{google_map_api_key: 1})
                message = "Google Map Api Key Updated Successfully"
            }else{
                message = "Google Map Api Key Update Unsuccessful"
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
            msg: "Google Map Api Key Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addRiderAndRestaurantExtraTime = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let settings = await Settings.findOne({},{rider_extra_time: 1, restaurant_extra_time: 1})
        let data = {}
        let message = ''
        if(!settings){

            let newsettings = new Settings({
                rider_extra_time: args.rider_extra_time,
                restaurant_extra_time: args.restaurant_extra_time
            })
            data = await newsettings.save()
            message = "Rider and Restaurant Extra Time Added Successfully"
        }else{

            let updateSettings = await Settings.updateOne({},{rider_extra_time: args.rider_extra_time, restaurant_extra_time: args.restaurant_extra_time})
            if(updateSettings.n > 0){
                data = await Settings.findOne({},{rider_extra_time: 1, restaurant_extra_time: 1})
                message = "Rider and Restaurant Extra Time Updated Successfully"
            }else{
                message = "Rider and Restaurant Extra Time Update Unsuccessful"
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
            msg: "Rider and Restaurant Extra Time Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addSSLCommerezInformation = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let settings = await Settings.findOne({},{ssl_commerez_store_id: 1, ssl_commerez_store_password: 1, ssl_commerez_currency: 1, ssl_commerez_cus_city: 1, ssl_commerez_cus_country: 1})
        let data = {}
        let message = ''
        if(!settings){

            let newsettings = new Settings({
                ssl_commerez_store_id: args.sslInput.ssl_commerez_store_id,
                ssl_commerez_store_password: args.sslInput.ssl_commerez_store_password,
                ssl_commerez_currency: args.sslInput.ssl_commerez_currency,
                ssl_commerez_cus_city: args.sslInput.ssl_commerez_cus_city,
                ssl_commerez_cus_country: args.sslInput.ssl_commerez_cus_country,
            })
            data = await newsettings.save()
            message = "SSL Information Added Successfully"
        }else{

            let updateSettings = await Settings.updateOne({},{
                ssl_commerez_store_id: args.sslInput.ssl_commerez_store_id,
                ssl_commerez_store_password: args.sslInput.ssl_commerez_store_password,
                ssl_commerez_currency: args.sslInput.ssl_commerez_currency,
                ssl_commerez_cus_city: args.sslInput.ssl_commerez_cus_city,
                ssl_commerez_cus_country: args.sslInput.ssl_commerez_cus_country,
            })
            if(updateSettings.n > 0){
                data = await Settings.findOne({},{ssl_commerez_store_id: 1, ssl_commerez_store_password: 1, ssl_commerez_currency: 1, ssl_commerez_cus_city: 1, ssl_commerez_cus_country: 1})
                message = "SSL Information Updated Successfully"
            }else{
                message = "SSL Information Update Unsuccessful"
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
            msg: "SSL Information Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addVat = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let settings = await Settings.findOne({},{customer_vat: 1, restaurant_vat: 1})
        let data = {}
        let message = ''
        if(!settings){

            let newsettings = new Settings({
                customer_vat: args.customer_vat,
                restaurant_vat: args.restaurant_vat
            })
            data = await newsettings.save()
            message = "Vat Added Successfully"
        }else{

            let updateSettings = await Settings.updateOne({},{customer_vat: args.customer_vat, restaurant_vat: args.restaurant_vat})
            if(updateSettings.n > 0){
                data = await Settings.findOne({},{customer_vat: 1, restaurant_vat: 1})
                message = "Vat Updated Successfully"
            }else{
                message = "Vat Update Unsuccessful"
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
            msg: "Vat Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addRiderCost = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let settings = await Settings.findOne({},{rider_cost: 1})
        let data = {}
        let message = ''
        if(!settings){

            let newsettings = new Settings({
                rider_cost: args.rider_cost
            })
            data = await newsettings.save()
            message = "Rider Cost Added Successfully"
        }else{

            let updateSettings = await Settings.updateOne({},{rider_cost: args.rider_cost})
            if(updateSettings.n > 0){
                data = await Settings.findOne({},{rider_cost: 1})
                message = "Rider Cost Updated Successfully"
            }else{
                message = "Rider Cost Update Unsuccessful"
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
            msg: "Rider Cost Creation UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.addSMSApiInformation = async(root, args, context) => {

    if(context.user.type !== 'admin'){

        let returnData = {
            error: true,
            msg: "Admin Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateSettings = await Settings.updateOne({},{
            sms_api_url: args.sms_api_url,
            sms_api_username: args.sms_api_username,
            sms_api_password: args.sms_api_password
        },{upsert: true})

        if(updateSettings.n < 1){
            let returnData = {
                error: true,
                msg: "SMS Api Update UnSuccessful",
                data: {}
            }
            return returnData
        }
        
        let returnData = {
            error: false,
            msg: 'SMS Api Update Successful',
            data: {
                sms_api_url: args.sms_api_url,
                sms_api_username: args.sms_api_username,
                sms_api_password: args.sms_api_password
            }
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "SMS Api Update UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.getSettings = async(root, args, context) => {
    
    try{

        let delivery_charge = await Settings.findOne({})
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