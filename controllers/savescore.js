let isCodeExecuted = false; // Flag to track if the code has been executed

module.exports = {
    post: async (req, res) => {
        try {
            if (isCodeExecuted==true) {
                const username = req.session.username;
                return res.redirect('/plead', { username: username });
            }

            isCodeExecuted = true; // Set the flag to indicate the code execution

            const ScoreModel = require("../models/score");
            const UserModel = require("../models/user");
            const { score, datetime } = req.body;
            const username = req.session.username; // Retrieve username from session
            console.log(req.body);
            console.log(username);
            if (!username || !datetime || !score) {
                return res.status(400).json({ error: 'Invalid data provided' });
            }

            let user = await UserModel.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const newScore = new ScoreModel({
                username,
                score,
                datetime,
            });

            await newScore.save();
            
            res.json({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Error saving score' });
    }
    }
}