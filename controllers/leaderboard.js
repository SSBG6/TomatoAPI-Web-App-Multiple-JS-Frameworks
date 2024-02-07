module.exports = {
    get: async (req, res) => {
        const ScoreModel = require("../models/score");
        try {
            // Fetch scores from the database (e.g., top 10 scores)
            const topScores = await ScoreModel.find({})
                .sort({ score: -1 }) // Sorting in descending order by score
                .limit(10); // Limit to top 10 scores
    
            // Render the 'leaderboard' view passing the 'topScores' data
            res.render('leaderboard', { leaderboard: topScores });
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            res.status(500).send('Error fetching leaderboard data');
        }
    
}}