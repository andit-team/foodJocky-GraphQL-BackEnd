const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const GlobalTransaction = require('../../models/global.transaction.model')
const Restaurant = require('../../models/restaurant.model')
const mongoose = require('mongoose')

exports.addOwner = async(root, args, context) => {
    
    try{

        let checkOwner = await User.findOne({mobile: args.ownerInput.mobile})
        if(checkOwner){
            let returnData = {
                error: true,
                msg: "Mobile Number Already Taken",
                data: {}
            }
            return returnData
        }

        const hash = bcrypt.hashSync(args.ownerInput.password, 8)
        let newOwner = new User({
            first_name: args.ownerInput.first_name,
            last_name: args.ownerInput.last_name,
            mobile: args.ownerInput.mobile,
            email: args.ownerInput.email,
            type: 'owner',
            owner_address: args.ownerInput.owner_address,
            password: hash,
            status: "pending",
            rejection_msg: "Your Request is in Pending Mode.......",
            national_id: args.ownerInput.national_id
        })

        let nOwner = await newOwner.save()

        let returnData = {
            error: false,
            msg: "Owner Created Successfully",
            data: nOwner
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

exports.ownerLogin = async(root, args, context) => {
    
    try{

        let owner = await User.findOne({
            mobile: args.mobile,
            type: 'owner'
        })

        if(!owner){
            let returnData = {
                token: '',
                error: true,
                msg: "owner Not Found",
                data: {}
            }
            return returnData
        }

        if(owner.status !== 'approved' ){
            let returnData = {
                token: '',
                error: true,
                msg: owner.rejection_msg,
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, owner.password)

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
                _id: owner._id,
                type: owner.type
            }, process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Owner Login Successful",
            data: owner
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

exports.updateOwner = async(root, args, context) => {

    if(context.user.type !== 'owner'){

        let returnData = {
            error: true,
            msg: "Owner Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateArgs = {
            _id: context.user.user_id
        }

        let upOwner = {
            first_name: args.ownerInput.first_name,
            last_name: args.ownerInput.last_name,
            mobile: args.ownerInput.mobile,
            email: args.ownerInput.email,
            owner_address: args.ownerInput.owner_address,
            national_id: args.ownerInput.national_id
        }

        if(args.ownerInput.password !== ''){
            const hash = bcrypt.hashSync(args.ownerInput.password, 8)
            upOwner.password = hash
        }

        let uOwner = await User.updateOne(updateArgs,upOwner)

        if(uOwner.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Owner Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Update Unsuccessful"
        }
        return returnData

    }
    

}

exports.deleteOwner = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let OwnerDelete = await User.deleteOne(deleteArgs)
        if(OwnerDelete.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Owner Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getAllOwners = async(root, args, context) => {

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
            type: 'owner'
        }

        if(args.status !== ""){
            query.status = args.status
        }

        let owners = await User.find(query).sort({createdAt: -1})

        let returnData = {
            error: false,
            msg: "Owner Get Successfully",
            data: owners
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Get UnSuccessful",
            data: []
        }
        return returnData

    }

}

exports.getOneOwner = async(root, args, context) => {

    try{

        let owner = await User.findById(args._id)

        let returnData = {
            error: false,
            msg: "Owner Get Successfully",
            data: owner
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Get UnSuccessful",
            data: []
        }
        return returnData

    }

}


exports.updateOwnerWithStatus = async(root, args, context) => {

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
            _id: args.ownerInput._id  
        }

        let upOwner = {
            first_name: args.ownerInput.first_name,
            last_name: args.ownerInput.last_name,
            mobile: args.ownerInput.mobile,
            email: args.ownerInput.email,
            owner_address: args.ownerInput.owner_address,
            national_id: args.ownerInput.national_id,
            status: args.ownerInput.status,
            rejection_msg: args.ownerInput.rejection_msg
        }

        if(args.ownerInput.password !== ''){
            const hash = bcrypt.hashSync(args.ownerInput.password, 8)
            upOwner.password = hash
        }

        let uOwner = await User.updateOne(updateArgs,upOwner)

        if(uOwner.n > 0){

            let returnData = {
                error: false,
                msg: "Owner Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Owner Status Update Unsuccessful"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Status Update Unsuccessful"
        }
        return returnData

    }
    

}

exports.verifyOwnerToken = async(root, args, context) => {
    
    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'owner'){

            let owner = await User.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: owner
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

exports.withdrawOwnerBalance = async(root, args, context) => {

    if(context.user.type !== 'owner'){

        let returnData = {
            error: true,
            msg: "Owner Login Required",
            data: {}
        }
        return returnData
    }
    
    try{

        let owner = await User.findById(context.user.user_id)

        if(owner.balance < args.amount){
            let returnData = {
                error: true,
                msg: "Insufficient Balance",
                data: {}
            }
            return returnData
        }

        let ownerPreviousBalance = owner.balance
        let ownerCurrentBalance = ownerPreviousBalance - args.amount
        owner.balance = ownerCurrentBalance
        await owner.save()

        let ownerGlobalTransactionData = {
            current_balance: ownerCurrentBalance,
            previous_balance: ownerPreviousBalance,
            amount: args.amount,
            debit_or_credit: 'credit',
            reason: 'Withdraw Request',
            status: 'pending',
            user_or_restaurant: owner._id,
            onModel:'Users',
        }
        let newOwnerGlobalTransaction = new GlobalTransaction(ownerGlobalTransactionData)
        let nOwnerGlobalTransaction = await newOwnerGlobalTransaction.save()
        let returnTransactionData = await GlobalTransaction.findById(nOwnerGlobalTransaction).populate('user_or_restaurant')

        if(!nOwnerGlobalTransaction){
            let returnData = {
                error: true,
                msg: "Owner Balance Transfer failed",
                data: {}
            }
            return returnData
        }

        let returnData = {
            error: false,
            msg: "Owner Balance Transfer Success",
            data: returnTransactionData
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Owner Balance Transfer failed",
            data: {}
        }
        return returnData

    }
}

exports.getWalletPageDataByOwner = async(root, args, context) => {

    if(context.user.type !== 'owner'){

        let returnData = {
            error: true,
            msg: "Owner Login Required",
            data: {}
        }
        return returnData
    }
    
    try{

        let owner = await User.findById(context.user.user_id)
        let restaurantTotalBalance = await Restaurant.aggregate([
            {
                $match: {
                    owner: mongoose.Types.ObjectId(owner._id),
                }
            },
            {
                $group: {
                    _id: null,
                    totalSum: {
                        $sum: '$balance'
                    }
                }
            }
        ])

        let returnTransactionData = await GlobalTransaction.find({user_or_restaurant: owner._id}).sort({createdAt: -1}).populate('user_or_restaurant')
        let returnData = {
            error: false,
            msg: "Wallet Data Get Successfully",
            data: {
                balance: owner.balance,
                restaurant_balace: restaurantTotalBalance[0].totalSum,
                transactions: returnTransactionData
            }
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Wallet Data Get Unsuccessful",
            data: {}
        }
        return returnData

    }
}