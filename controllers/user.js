const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.addUser = async(root, args, context) => {
    
    let newUser = new User(args);
    
    return await newUser.save()

}

exports.getAllUser = async(root, args, context) => {

    let users = await User.find({});
    return users;

}

exports.userLogin = async(root, args, context) => {
    let user = await User.findOne({
        email: args.email
    })

    if(!user){
        return new Error("User Not Found");
    }

    // let isRightPass = bcrypt.compare(req.body.password, user.password)
    if(user.password !== args.password){
        return new Error("Password Not Matched");
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET, {
        expiresIn: "8h"
    });

    return token;

}