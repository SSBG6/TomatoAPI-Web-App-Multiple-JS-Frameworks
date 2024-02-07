module.exports = {
    post : async (req, res) => {
        try {
            const { username, email, password1, password2, password3 } = req.body;
            const UserModel = require("../models/user");
            const bcrypt = require('bcryptjs');
            // Validate if new passwords match
            if (password2 !== password3) {
                return res.status(400).send('New passwords do not match');
            }
    
            // Retrieve the user based on the session username
            const user = await UserModel.findOne({ username: req.session.username });
    
            if (!user) {
                return res.status(404).send('User not found');
            }
    
            // Validate the current password (password1) before allowing changes
            const isPasswordValid = await bcrypt.compare(password1, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).send('Incorrect current password');
            }
    
            // Update the user's profile information
            user.username = username;
            user.email = email;
    
            // Check if a new password is provided and update it
            if (password2 && password3) {
                if (password1!=password2){
                    const hashedNewPassword = await bcrypt.hash(password2, 12);
                    user.password = hashedNewPassword;
                }console.log('New password is identical to the current Password');
            }
    
            console.log('Changes have been applied');
            // Save the updated user data to the database
            await user.save();
    
            // Optionally, update the session with the new username
            req.session.username = username;
    
            // Redirect to the profile page or any other suitable route after successful update
            res.redirect('/login');
        } catch (error) {
            console.log('Error updating profile:', error);
            res.status(500).send('Error updating profile');
        }
    }}