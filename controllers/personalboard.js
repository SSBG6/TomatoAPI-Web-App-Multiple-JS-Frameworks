module.exports = {
    get: async (req, res) => {
        const ScoreModel = require("../models/score");
        const username = req.session.username;

        try {
            // Fetch scores for a specific user from the database using their username
            const userScores = await ScoreModel.find({ username: username })
                .sort({ score: -1 }) // Sorting in descending order by score
                .limit(10); // Limit to top 10 scores for the user
    
            // Render the 'personalLeaderboard' view passing the user's scores
            res.render('plead', { userScores: userScores });
        } catch (error) {
            console.error('Error getting personal leaderboard data:', error);
            res.status(500).send('Error getting personal leaderboard data');
        }
    }
}