const User = require('../../models/user.model')
const Restaurant = require('../../models/restaurant.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Settings = require('../../models/settings.model')
const GlobalTransaction = require('../../models/global.transaction.model')
const Plan = require('../../models/plan.model')
const mongoose = require('mongoose')

exports.addRestaurant = async(root, args, context) => {
   
    if(context.user.type !== 'owner'){

        let returnData = {
            error: true,
            msg: "Owner Login Required",
            data: {}
        }
        return returnData

    }

    try{
        const hash = bcrypt.hashSync(args.restaurantInput.password, 8)
        let resData = {
            user: args.restaurantInput.user,
            password: hash,
            name: args.restaurantInput.name,
            restaurant_or_homemade: args.restaurantInput.restaurant_or_homemade,
            owner: context.user.user_id,
            plan: args.restaurantInput.plan,
            tags: args.restaurantInput.tags,
            description: args.restaurantInput.description,
            cover_img: args.restaurantInput.cover_img,
            thumb_img: args.restaurantInput.thumb_img,
            address: args.restaurantInput.address,
            location: {
                type: "Point",
                coordinates: [args.restaurantInput.address.location.lng,args.restaurantInput.address.location.lat]
            },
            food_categories: args.restaurantInput.food_categories,
            price_type: args.restaurantInput.price_type,
            status: "pending",
            rejection_msg: "Your Request is in Pending Mode.......",
            residential_or_municipal: args.restaurantInput.residential_or_municipal,
            discount_given_by_restaurant: args.restaurantInput.discount_given_by_restaurant,
            discount_given_by_admin: args.restaurantInput.discount_given_by_admin,
            vat: args.restaurantInput.vat,
            rider_cost: args.restaurantInput.rider_cost
        }

        let agent;

        if(args.restaurantInput.residential_or_municipal === 'residential'){
            
            agent = await User.findOne({
                type: 'agent',
                status: 'approved',
                agent_level: 'village',
                division: args.restaurantInput.division,
                district: args.restaurantInput.district,
                upazila: args.restaurantInput.upazila,
                union: args.restaurantInput.union,
                village: args.restaurantInput.village
            },{
                _id: 1
            })

            if(!agent){

                agent = await User.findOne({
                    type: 'agent',
                    status: 'approved',
                    agent_level: 'union',
                    division: args.restaurantInput.division,
                    district: args.restaurantInput.district,
                    upazila: args.restaurantInput.upazila,
                    union: args.restaurantInput.union
                },{
                    _id: 1
                })

                if(!agent){

                    agent = await User.findOne({
                        type: 'agent',
                        status: 'approved',
                        agent_level: 'upazila',
                        division: args.restaurantInput.division,
                        district: args.restaurantInput.district,
                        upazila: args.restaurantInput.upazila
                    },{
                        _id: 1
                    })

                    if(!agent){

                        agent = await User.findOne({
                            type: 'agent',
                            status: 'approved',
                            agent_level: 'district',
                            division: args.restaurantInput.division,
                            district: args.restaurantInput.district
                        },{
                            _id: 1
                        })
                        if(!agent){

                            agent = await User.findOne({
                                type: 'agent',
                                status: 'approved',
                                agent_level: 'division',
                                division: args.restaurantInput.division,
                            },{
                                _id: 1
                            })

                            if(!agent){

                                let returnData = {
                                    error: true,
                                    msg: "No Agent In Your Area",
                                    data: {}
                                }
                                return returnData

                            }
                        }
                    }

                }
            }

            resData = {
                ...resData,
                division: args.restaurantInput.division,
                district: args.restaurantInput.district,
                upazila: args.restaurantInput.upazila,
                union: args.restaurantInput.union,
                village: args.restaurantInput.village,
                agent: agent._id
            }

        } else {
            
            agent = await User.findOne({
                type: 'agent',
                status: 'approved',
                agent_level: 'ward',
                division: args.restaurantInput.division,
                district: args.restaurantInput.district,
                municipal: args.restaurantInput.municipal,
                ward: args.restaurantInput.ward
            },{
                _id: 1
            })

            if(!agent){

                agent = await User.findOne({
                    type: 'agent',
                    status: 'approved',
                    agent_level: 'municipal',
                    division: args.restaurantInput.division,
                    district: args.restaurantInput.district,
                    municipal: args.restaurantInput.municipal
                },{
                    _id: 1
                })
                    if(!agent){

                        agent = await User.findOne({
                            type: 'agent',
                            status: 'approved',
                            agent_level: 'district',
                            division: args.restaurantInput.division,
                            district: args.restaurantInput.district
                        },{
                            _id: 1
                        })
                        if(!agent){

                            agent = await User.findOne({
                                type: 'agent',
                                status: 'approved',
                                agent_level: 'division',
                                division: args.restaurantInput.division,
                            },{
                                _id: 1
                            })

                            if(!agent){

                                let returnData = {
                                    error: true,
                                    msg: "No Agent In Your Area",
                                    data: {}
                                }
                                return returnData

                            }
                        }
                }
            }

            resData = {
                ...resData,
                division: args.restaurantInput.division,
                district: args.restaurantInput.district,
                municipal: args.restaurantInput.municipal,
                ward: args.restaurantInput.ward,
                agent: agent._id
            }


        }

        let newRestaurant = new Restaurant(resData)

        let nRestaurant = await newRestaurant.save()

        let returnData = {
            error: false,
            msg: "Restaurant Created Successfully",
            data: nRestaurant
        }
        return returnData

    }catch(error){

        if (error.code === 11000 && error.keyPattern.user) {
            let returnData = {
                error: true,
                msg: 'User Already Exists',
                data: {}
            }
            return returnData
        }

        let returnData = {
            error: true,
            msg: "Server Failure",
            data: {}
        }
        return returnData

    }
    

}

exports.restaurantLogin = async(root, args, context) => {
    
    try{

        let restaurant = await Restaurant.findOne({
            user: args.user
        })

        if(!restaurant){
            let returnData = {
                token: '',
                error: true,
                msg: "Restaurant Not Found",
                data: {}
            }
            return returnData
        }

        if(restaurant.status !== 'approved'){
            let returnData = {
                token: '',
                error: true,
                msg: "Restaurant Not Approved",
                data: {}
            }
            return returnData
        }

        let passMatch = await bcrypt.compare(args.password, restaurant.password)

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
                _id: restaurant._id,
                type: 'restaurant'
            },
            process.env.SECRET, 
            {
            expiresIn: "8h"
        })

        let returnData = {
            token: token,
            error: false,
            msg: "Restaurant Login Successful",
            data: restaurant
        }
        return returnData

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Login UnSuccessful",
            data: {}
        }
        return returnData

    }
    

}

// By Owner
exports.updateRestaurant = async(root, args, context) => {

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
            _id: args.restaurantInput._id
        }

        let upRestaurant = {
            user: args.restaurantInput.user,
            name: args.restaurantInput.name,
            //restaurant_or_homemade: args.restaurantInput.restaurant_or_homemade,
            // plan: args.restaurantInput.plan,
            // discount_given_by_restaurant: args.restaurantInput.discount_given_by_restaurant,
            // discount_given_by_admin: args.restaurantInput.discount_given_by_admin,
            tags: args.restaurantInput.tags,
            description: args.restaurantInput.description,
            cover_img: args.restaurantInput.cover_img,
            thumb_img: args.restaurantInput.thumb_img,
            address: args.restaurantInput.address,
            location: {
                type: "Point",
                coordinates: [args.restaurantInput.address.location.lng,args.restaurantInput.address.location.lat]
            },
            price_type: args.restaurantInput.price_type,
        }

        if(args.restaurantInput.password !== ''){
            const hash = bcrypt.hashSync(args.restaurantInput.password, 8)
            upRestaurant.password = hash
        }

        let uRestaurant = await Restaurant.updateOne(updateArgs,upRestaurant)

        if(uRestaurant.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Restaurant Update Failed!!!"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Update Unsuccessful"
        }
        return returnData

    }
    

}

// Rest. Status Update by owner
exports.updateRestaurantActivityByOwner = async(root, args, context) => {

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
            _id: args.rest_id
        }

        let upRestaurant = {
            active: args.status,
        }

        let uRestaurant = await Restaurant.updateOne(updateArgs,upRestaurant)

        console.log(uRestaurant)
        if(uRestaurant.n > 0){
            let returnData = {
                error: false,
                msg: "Activity Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Activity Update Failed!!!"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Activity Status Update Failed!!!"
        }
        return returnData

    }
    

}

// Rest. Status Self Update
exports.updateRestaurantActivityBySelf = async(root, args, context) => {

    if(context.user.type !== 'restaurant'){

        let returnData = {
            error: true,
            msg: "Restaurant Login Required",
            data: {}
        }
        return returnData

    }
    
    try{

        let updateArgs = {
            _id: context.user.user_id
        }

        let upRestaurant = {
            active: args.status,
        }

        let uRestaurant = await Restaurant.updateOne(updateArgs,upRestaurant)

        
        if(uRestaurant.n > 0){
            let returnData = {
                error: false,
                msg: "Activity Status Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Activity Update Failed!!!"
            }
            return returnData
        }
        

    }catch(error){

        let returnData = {
            error: true,
            msg: "Activity Status Update Failed!!!"
        }
        return returnData

    }
    

}

exports.deleteRestaurant = async(root, args, context) => {

    try{
        let deleteArgs = {
            _id: args._id
        }
        let RestaurantDelete = await User.deleteOne(deleteArgs)
        if(RestaurantDelete.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Deletion Successful"
            }
            return returnData

        }else{

            let returnData = {
                error: true,
                msg: "Restaurant Deletion UnSuccessful"
            }
            return returnData

        }

    }catch(error){

        let returnData = {
            error: true,
            msg: "Restaurant Deletion UnSuccessful"
        }
        return returnData

    }

}

exports.getAllRestaurantsByAdmin = async(root, args, context) => {

  if(context.user.type !== 'admin'){

    let returnData = {
        error: true,
        msg: "Admin Login Required",
        data: {}
    }
    return returnData

}

  try{

    let query = {}

    if(args.owner_id !== ""){
        query.owner = args.owner_id
    }

    if(args.status !== ""){
        query.status = args.status
    }

    let result = await Restaurant.find(query).sort({createdAt: -1}).populate('owner').populate('plan')

    let returnData = {
        error: false,
        msg: "Restaurant Get Successfully",
        data: result
    }
    return returnData

  }catch(error){

    let returnData = {
        error: true,
        msg: "Restaurant Get Unsuccessful"
    }
    return returnData

  }
}

exports.getAllRestaurantsByAgent = async(root, args, context) => {

    if(context.user.type !== 'agent'){
  
      let returnData = {
          error: true,
          msg: "Agent Login Required",
          data: {}
      }
      return returnData
  
  }
  
    try{

     let query = {
         division: args.areaInput.division
     }

     if(args.areaInput.status !== ''){
         query = {
             ...query,
             status: args.areaInput.status
         }
     }

     if(args.areaInput.district !== ''){
         query = {
             ...query,
             district: args.areaInput.district
         }
     }
     if(args.areaInput.municipal !== ''){
        query = {
            ...query,
            district: args.areaInput.district,
            municipal: args.areaInput.municipal
        }
     }
     if(args.areaInput.ward !== ''){
        query = {
            ...query,
            district: args.areaInput.district,
            municipal: args.areaInput.municipal,
            ward: args.areaInput.ward
        }
     }
     if(args.areaInput.upazila !== ''){
        query = {
            ...query,
            district: args.areaInput.district,
            upazila: args.areaInput.upazila
        }
     }
     if(args.areaInput.union !== ''){
        query = {
            ...query,
            district: args.areaInput.district,
            upazila: args.areaInput.upazila,
            union: args.areaInput.union
        }
     }
     if(args.areaInput.village !== ''){
        query = {
            ...query,
            district: args.areaInput.district,
            upazila: args.areaInput.upazila,
            union: args.areaInput.union,
            village: args.areaInput.village
        }
     }
  
      let result = await Restaurant.find(query).sort({createdAt: -1}).populate('owner').populate('plan')
  
      let returnData = {
          error: false,
          msg: "Restaurant Get Successfully",
          data: result
      }
      return returnData
  
    }catch(error){
  
      let returnData = {
          error: true,
          msg: "Restaurant Get Unsuccessful"
      }
      return returnData
  
    }
  }

exports.getAllRestaurantsByOwner = async(root, args, context) => {
  // todo

  if(context.user.type !== 'owner'){

    let returnData = {
        error: true,
        msg: "Owner Login Required",
        data: {}
    }
    return returnData

}

  try{

    let query = {
        owner: context.user.user_id
    }

    if(args.status !== ""){
        query.status = args.status
    }

    let result = await Restaurant.find(query).sort({createdAt: -1}).populate('owner').populate('plan')

    let returnData = {
        error: false,
        msg: "Restaurant Get Successfully",
        data: result
    }
    return returnData

  }catch(error){

    let returnData = {
        error: true,
        msg: "Restaurant Get Unsuccessful"
    }
    return returnData

  }
}

exports.getOneRestaurant = async(root, args, context) => {

    // todo

    try{

        let restaurant = await Restaurant.findById(args._id).populate('owner').populate('plan')
        let settings = await Settings.findOne()

        let marginCommission = 20
        let commission = restaurant.plan.commision
        let discount_given_by_admin = restaurant.discount_given_by_admin
        let riderCost = settings.rider_cost
        let cashbackPercentage = settings.customer_cashback_percentange
        let restaurnatVat = settings.restaurant_vat

        let object = {
            marginCommission,
            commission,
            discount_given_by_admin,
            riderCost,
            cashbackPercentage,
            restaurnatVat,
            restaurant_vat_boolean: restaurant.vat,
            restaurant_rider_cost_boolean: restaurant.rider_cost
        }
        
        let foodCategories = restaurant.food_categories.map((element) => {
            let newFood = element.foods.map((food) => {
                food.price = businessLogic(food.price, object)
                if(food.price_and_size.length !== 0){
                    food.price_and_size.map((price_size) => {
                        price_size.price = businessLogic(price_size.price, object)
                        return price_size
                    })
                }
                return food
            })
            element.foods = newFood
            return element
        })
        restaurant.food_categories = foodCategories

        let returnData = {
            error: false,
            msg: "Restaurant Get Successfully",
            data: restaurant
        }
        return returnData

    }catch(error){

        console.log(error)

        let returnData = {
            error: true,
            msg: "Restaurant Get Unsuccessful"
        }
        return returnData

    }

    function businessLogic(price,{marginCommission,commission,discount_given_by_admin,riderCost,cashbackPercentage,restaurnatVat,restaurant_vat_boolean,restaurant_rider_cost_boolean}){

        let basePrice = price
        // Increase Price giving Wallet Cashback
        price = price + ((basePrice * cashbackPercentage)/100)

        // Increase Price giving discount by admin
        price = price + ((basePrice * discount_given_by_admin)/100)

        // Increase Price from restaurnat commission
        let commissionAddOrNot = marginCommission - commission
        if(commissionAddOrNot > 0){
            price = price + ((basePrice * commissionAddOrNot)/100)
        }

        // Increase Price from restaurnat vat
        if(!restaurant_vat_boolean){
            price = price + ((basePrice * restaurnatVat)/100)
        }

        // Increase Price from Rider Cost
        if(!restaurant_rider_cost_boolean){
            price = price + riderCost
        }

        return price

    }

}

exports.updateRestaurantStatus = async(root, args, context) => {

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
            _id: args.restaurantInput._id
        }

        let upRestaurant = {
            user: args.restaurantInput.user,
            name: args.restaurantInput.name,
            plan: args.restaurantInput.plan,
            discount_given_by_restaurant: args.restaurantInput.discount_given_by_restaurant,
            discount_given_by_admin: args.restaurantInput.discount_given_by_admin,
            restaurant_or_homemade: args.restaurantInput.restaurant_or_homemade,
            // tags: args.restaurantInput.tags,
            // description: args.restaurantInput.description,
            // cover_img: args.restaurantInput.cover_img,
            // thumb_img: args.restaurantInput.thumb_img,
            // address: args.restaurantInput.address,
            // food_categories: args.restaurantInput.food_categories,
            // price_type: args.restaurantInput.price_type,
            status: args.restaurantInput.status,
            rejection_msg: args.restaurantInput.rejection_msg,
            vat: args.restaurantInput.vat,
            rider_cost: args.restaurantInput.rider_cost
        }

        if(args.restaurantInput.password !== ''){
            const hash = bcrypt.hashSync(args.restaurantInput.password, 8)
            upRestaurant.password = hash
        }

        let uRestaurant = await Restaurant.updateOne(updateArgs,upRestaurant)

        if(uRestaurant.n > 0){

            let returnData = {
                error: false,
                msg: "Restaurant Updated Successfully"
            }
            return returnData

        }else{
            let returnData = {
                error: true,
                msg: "Restaurant Update Failed!!!"
            }
            return returnData
        }
        

    }catch(error){

        console.log(error)
        let returnData = {
            error: true,
            msg: "Restaurant Update Unsuccessful"
        }
        return returnData

    }
    

}

exports.getTopRestaurants = async(root, args, context) => {

    try{
        let plans = await Plan.find({},{_id: 1}).sort({commision: -1}).limit(3)
        let plan_ids = plans.map(element => element._id)

        let topRestaurants = await Restaurant.find(
            {
                restaurant_or_homemade: 'restaurant',
                status: 'approved',
                plan: plan_ids
            })

        if(topRestaurants.length === 0){
            let returnData = {
                error: true,
                msg: "No Restaurant Available"
            }
            return returnData
        }
    
        let returnData = {
            error: false,
            msg: "Restaurant Get Successfully",
            data: topRestaurants
        }
        return returnData
    }catch(error){
        let returnData = {
            error: true,
            msg: "Restaurant Get Unsuccessful"
        }
        return returnData
    }
}

exports.SearchRestaurants = async(root, args, context) => {
  
    try{

        let rData = {}

        if('' === args.name && !args.filter){
            let plans = await Plan.find({},{_id: 1}).sort({commision: -1}).limit(3)
            let plan_ids = plans.map(element => element._id)

            let query = {
                location: {
                 $near: {
                  $maxDistance: 4000,
                  $geometry: {
                   type: "Point",
                   coordinates: [args.longitude, args.latitude]
                  }
                 }
                },
                restaurant_or_homemade: args.restaurant_or_homemade,
                status: 'approved'
            }

            let result = await Restaurant.find(query)
            rData = {
                ...rData,
                allRestaurants: result,
            }

            let topRestaurants = await Restaurant.find(
                {
                    location: {
                        $near: {
                         $maxDistance: 4000,
                         $geometry: {
                          type: "Point",
                          coordinates: [args.longitude, args.latitude]
                         }
                        }
                       },
                    restaurant_or_homemade: args.restaurant_or_homemade,
                    status: 'approved',
                    plan: plan_ids
                }
                ).limit(10)

            rData = {
                ...rData,
                topRestaurants
            }

            let nearestRestaurants = await Restaurant.find({
                location: {
                    $near: {
                        $maxDistance: 1000,
                        $geometry: {
                            type: "Point",
                            coordinates: [args.longitude, args.latitude]
                        }
                    }
                },
                restaurant_or_homemade: args.restaurant_or_homemade,
                status: 'approved'
            }).limit(10)

            rData = {
                ...rData,
                nearestRestaurants
            }

            let newRestaurants = await Restaurant.find({
                location: {
                    $near: {
                        $maxDistance: 4000,
                        $geometry: {
                            type: "Point",
                            coordinates: [args.longitude, args.latitude]
                        }
                    }
                },
                restaurant_or_homemade: args.restaurant_or_homemade,
                status: 'approved'
            }).sort({createdAt: -1}).limit(10)

            rData = {
                ...rData,
                newRestaurants
            }
        }else if('' !== args.name){
            let query = {
                location: {
                 $near: {
                  $maxDistance: 4000,
                  $geometry: {
                   type: "Point",
                   coordinates: [args.longitude, args.latitude]
                  }
                 }
                },
                restaurant_or_homemade: args.restaurant_or_homemade,
                status: 'approved',
                $or: [
                    {
                        name: {$regex: args.name, $options: 'i'}
                    },
                    {
                        'food_categories.name': {$regex: args.name, $options: 'i'}
                    },
                    {
                        'food_categories.foods.name': {$regex: args.name, $options: 'i'}
                    },
                ]
            }
            let result = await Restaurant.find(query)
            rData = {
                ...rData,
                allRestaurants: result,
            }
        }else if(args.filter){

            let query = {
                location: {
                 $near: {
                  $maxDistance: 4000,
                  $geometry: {
                   type: "Point",
                   coordinates: [args.longitude, args.latitude]
                  }
                 }
                },
                restaurant_or_homemade: args.restaurant_or_homemade,
                status: 'approved'
            }
                        
            if(args.category.length > 0){
                query = {
                    ...query,
                    food_categories: {
                        $elemMatch: {
                            _id: args.category
                        }
                    }
                }
            }

            if(args.price_type !== ''){
                query = {
                    ...query,
                    price_type: args.price_type
                }
            }
            let result = await Restaurant.find(query)
            rData = {
                ...rData,
                allRestaurants: result,
            }
        }

      let returnData = {
          error: false,
          msg: "Restaurant Get Successfully",
          data: rData
      }
      return returnData
  
    }catch(error){
  
      let returnData = {
          error: true,
          msg: "Restaurant Get Unsuccessful"
      }
      return returnData
  
    }
  }

  exports.verifyRestaurantToken = async(root, args, context) => {
    
    try{

        const decodedToken = jwt.verify(
            args.token,
            process.env.SECRET
        )

        if(decodedToken.type === 'restaurant'){

            let restaurant = await Restaurant.findById(decodedToken._id)

            let returnData = {
                error: false,
                msg: "Token Verified Successfully",
                data: restaurant
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

exports.transferBalanceFromRestaurant = async(root, args, context) => {
  
    if(context.user.type !== 'owner'){
  
      let returnData = {
          error: true,
          msg: "Owner Login Required",
          data: {}
      }
      return returnData
  
  }
  
    try{
  
      let restaurant = await Restaurant.findById(args.restaurant_id)

      if(restaurant.balance === undefined){
        restaurant.balance = 0
        await restaurant.save()
        
        let returnData = {
            error: true,
            msg: "Insufficient Balance"
        }
        return returnData
      }

      if(args.amount > restaurant.balance){
        let returnData = {
            error: true,
            msg: "Insufficient Balance"
        }
        return returnData
      }

      let owner = await User.findById(restaurant.owner)
      let ownerPreviousBalance = owner.balance ? owner.balance : 0
      let ownerCurrentBalance = ownerPreviousBalance + args.amount
      owner.balance = ownerCurrentBalance
      await owner.save()

      let ownerGlobalTransactionData = {
        current_balance: ownerCurrentBalance,
        previous_balance: ownerPreviousBalance,
        amount: args.amount,
        debit_or_credit: 'debit',
        reason: 'Transfer balance from restaurant',
        status: 'success',
        user_or_restaurant: owner._id,
        onModel:'Users',
      }
      let newOwnerGlobalTransaction = new GlobalTransaction(ownerGlobalTransactionData)
      let nOwnerGlobalTransaction = await newOwnerGlobalTransaction.save()

      if(!nOwnerGlobalTransaction){
        let returnData = {
            error: true,
            msg: "Problem when creating owner report"
        }
        return returnData
      }

      let restaurantPreviousBalance = restaurant.balance ? restaurant.balance : 0
      let restaurantCurrentBalance = restaurantPreviousBalance - args.amount
      restaurant.balance = restaurantCurrentBalance
      await restaurant.save()

      let restaurantGlobalTransactionData = {
        current_balance: restaurantCurrentBalance,
        previous_balance: restaurantPreviousBalance,
        amount: args.amount,
        debit_or_credit: 'credit',
        reason: 'Transfer balance to owner account',
        status: 'success',
        user_or_restaurant: restaurant._id,
        onModel:'Restaurants',
      }
      let newRestaurantGlobalTransaction = new GlobalTransaction(restaurantGlobalTransactionData)
      let nRestaurantGlobalTransaction = await newRestaurantGlobalTransaction.save()

      if(!nRestaurantGlobalTransaction){
        let returnData = {
            error: true,
            msg: "Problem when creating restaurant report"
        }
        return returnData
      }
  
      let returnData = {
          error: false,
          msg: "Balance transferred successfully"
      }
      return returnData
  
    }catch(error){
  
      let returnData = {
          error: true,
          msg: "Problem when transfering balance"
      }
      return returnData
  
    }
  }

  exports.transferBalanceFromAllRestaurant = async(root, args, context) => {
  
    if(context.user.type !== 'owner'){
  
      let returnData = {
          error: true,
          msg: "Owner Login Required",
          data: {}
      }
      return returnData
  
  }
  
    try{

        let restaurants = await Restaurant.find({owner: context.user.user_id},{_id: 1})
        let successfullyTransferred = 0
        for(let i=0; i<restaurants.length; i++){
            let data = await transferOneRestaurantBalance(restaurants[i]._id)
            if(data.error){
                continue
            }
            successfullyTransferred++
        }
  
        let returnData = {
            error: false,
            msg: `Balance transferred successfully From ${successfullyTransferred} Restaurants`
        }
        return returnData
  
    }catch(error){
  
      let returnData = {
          error: true,
          msg: "Problem when transfering balance"
      }
      return returnData
  
    }

    async function transferOneRestaurantBalance(restaurant_id){
        try{

        let restaurant = await Restaurant.findById(restaurant_id)

        if(restaurant.balance === undefined){
            restaurant.balance = 0
            await restaurant.save()
            
            let returnData = {
                error: true
            }
            return returnData
        }

        if(restaurant.balance <= 0){
            let returnData = {
                error: true
            }
            return returnData
        }

        let owner = await User.findById(restaurant.owner)
        let ownerPreviousBalance = owner.balance ? owner.balance : 0
        let ownerCurrentBalance = ownerPreviousBalance + restaurant.balance
        owner.balance = ownerCurrentBalance
        await owner.save()

        let ownerGlobalTransactionData = {
            current_balance: ownerCurrentBalance,
            previous_balance: ownerPreviousBalance,
            amount: restaurant.balance,
            debit_or_credit: 'debit',
            reason: 'Transfer balance from restaurant',
            status: 'success',
            user_or_restaurant: owner._id,
            onModel:'Users',
        }
        let newOwnerGlobalTransaction = new GlobalTransaction(ownerGlobalTransactionData)
        let nOwnerGlobalTransaction = await newOwnerGlobalTransaction.save()

        if(!nOwnerGlobalTransaction){
            let returnData = {
                error: true
            }
            return returnData
        }

        let restaurantPreviousBalance = restaurant.balance ? restaurant.balance : 0
        let restaurantCurrentBalance = restaurantPreviousBalance - restaurantPreviousBalance
        restaurant.balance = restaurantCurrentBalance
        await restaurant.save()

        let restaurantGlobalTransactionData = {
            current_balance: restaurantCurrentBalance,
            previous_balance: restaurantPreviousBalance,
            amount: restaurantPreviousBalance,
            debit_or_credit: 'credit',
            reason: 'Transfer balance to owner account',
            status: 'success',
            user_or_restaurant: restaurant._id,
            onModel:'Restaurants',
        }
        let newRestaurantGlobalTransaction = new GlobalTransaction(restaurantGlobalTransactionData)
        let nRestaurantGlobalTransaction = await newRestaurantGlobalTransaction.save()

        if(!nRestaurantGlobalTransaction){
            let returnData = {
                error: true
            }
            return returnData
        }

        return {
            error: false
        }

    }catch(error){
        let returnData = {
            error: true
        }
        return returnData
    }
    }
}

exports.getAllRestaurantsByCategory = async(root, args, context) => {
  
    try{
        let query = {
            'food_categories._id': args.category_id,
            status: 'approved'
        }
        let result = await Restaurant.find(query).sort({createdAt: -1})
    
        let returnData = {
            error: false,
            msg: "Restaurant Get Successfully",
            data: result
        }
        return returnData
  
    }catch(error){
  
      let returnData = {
          error: true,
          msg: "Restaurant Get Unsuccessful"
      }
      return returnData
  
    }
  }