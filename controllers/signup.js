module.exports = {
    post: async (req,res)=>{
    const UserModel = require("../models/user");
    const bcrypt = require('bcryptjs');
    const {username, email, password} = req.body;
    // checking whether theres an existing user with the same email
    let user = await UserModel.findOne({email});

    if (user){
        return res.redirect('/signup');
    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new UserModel ({
        username,
        email,
        password: hashedPsw
    });

    await user.save();

    res.redirect('/login');
}}