module.exports = {
    post: async (req,res)=>{
    const UserModel = require("../models/user");
    const bcrypt = require('bcryptjs');
    const {email, password} = req.body;
    //CHECKING WHETHER THE EMAIL IS LOGGED IN OR NOT
    const user = await UserModel.findOne({email});

    if(!user){
        return res.redirect('/login');
    }
    //CHECKING PASSWORD USING BCRYPT
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.redirect('/login');
    }

    req.session.isAuth = true;
    req.session.username = user.username; // Store username in the session
    console.log("Logged in as:", user.username); // Log the username
    res.redirect('/game');
}}