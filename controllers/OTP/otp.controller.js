const OTP = require('../../models/otp.model')
const Settings = require('../../models/settings.model')
const axios = require('axios')
const FormData = require('form-data')
const User = require('../../models/user.model')

exports.sendOtp = async(root, args, context) => {

    try{
        let user = await User.findOne({mobile: args.mobile})
        if(user){
            let returnData = {
                error: true,
                msg: "User Already Available"
            }
            return returnData
        }
        let otpdata = {
            mobile: args.mobile,
            otp: Math.floor(1000 + Math.random() * 9000),
            count: 0
        }

        let newOtp = new OTP(otpdata)

        let nOtp = await newOtp.save()

        let setting = await Settings.findOne({})

        const formData = new FormData()
        formData.append('username', setting.sms_api_username)
        formData.append('password', setting.sms_api_password)
        formData.append('number', nOtp.mobile)
        formData.append('message', `আপনার ফুডজকি ভেরিফিকেশন কোডঃ ${nOtp.otp}`)

        let smsData = await axios.post(setting.sms_api_url, formData, {headers: formData.getHeaders()})
        
        if(!smsData.data.includes('1101')){
            let returnData = {
                error: true,
                msg: "OTP Not Sent"
            }
            return returnData
        }

        let returnData = {
            error: false,
            msg: "OTP Send Successfully"
        }
        return returnData

    }catch(error){

        if (error.code === 11000 && error.keyPattern.mobile) {
            let returnData = {
                error: true,
                msg: 'Mobile Number Already Available in OTP Verification Mode Please Wait...'
            }
            return returnData
        }

        let returnData = {
            error: true,
            msg: "Server Failure"
        }
        return returnData

    }
}

exports.verifyOtp = async(root, args, context) => {

    try{
        let otpdata = {
            mobile: args.mobile
        }

        let checkOTP = await OTP.findOne(otpdata)

        if(!checkOTP){
            let returnData = {
                error: true,
                msg: "OTP Does not Match Please Send OTP Again"
            }
            return returnData
        }

        
        if(checkOTP.otp === args.otp){
            let date = new Date()
            date.setMinutes(date.getMinutes() + 10)
            await OTP.updateOne({_id: checkOTP._id},{ expireAt: date })
            let returnData = {
                error: false,
                msg: "OTP Verification Successful"
            }
            return returnData
        }

        if(checkOTP.count >= 3){
            await OTP.deleteOne({mobile: args.mobile})
            let returnData = {
                error: true,
                close_model: true,
                msg: "You Have Putted Wrong OTP Many Times Please Send OTP Again"
            }
            return returnData
        }

        let otpCount = checkOTP.count + 1

        checkOTP.count = otpCount
        await checkOTP.save()

        let returnData = {
            error: true,
            msg: "OTP Does not Match"
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Server Failure"
        }
        return returnData

    }
}