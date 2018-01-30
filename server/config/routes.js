// no need for controllers, very minimal routes
let Score = require('../models/scores')

module.exports = (app) => {
    app.get('/api/scores', (req, res) => {
        Score.find((err, scores) => {
            if (err) {
                return console.error(err)
            }
            return res.json({ success: true, scores })
        })
    })

    app.post('/api/scores/add', (req, res) => {
        let { player, score, speed } = req.body
        if (player && score && speed) {
            console.log(player, score, speed)
            let newScore = new Score({ player, score, speed })
            newScore.save(err => {
                if (err) {
                    return console.error(err)
                }
                console.log(`Successfully saved new score for ${player}`)
                return res.json({ success: true })
            })
        }
    })
}
