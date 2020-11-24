const User = require('../../models/user.model')
const Restaurant = require('../../models/restaurant.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addOrder = async(root, args, context) => {
   
    if(context.user.type !== 'customer'){

        let returnData = {
            error: true,
            msg: "Customer Login Required",
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

        let returnData = {
            error: true,
            msg: "Restaurant Create Failed",
            data: {}
        }
        return returnData

    }
    

}