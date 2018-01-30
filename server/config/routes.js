// no need for controllers, very minimal routes
let Score = require('../models/scores')

const fakeScores = [
    {
        _id: 0,
        player: 'Sally',
        score: 110,
        speed: 'Medium'
    },
    {
        _id: 1,
        player: 'Mark',
        score: 270,
        speed: 'Medium'
    },
    {
        _id: 2,
        player: 'sam',
        score: 60,
        speed: 'Medium'
    },
    {
        _id: 3,
        player: 'Matt',
        score: 420,
        speed: 'Medium'
    }
]

module.exports = (app) => {
    app.get('/api/scores', (req, res) => {
        console.log('getting scors???')
        Score.find((err, scores) => {
            console.log('finding scores!')
            console.log('err?', err)
            console.log('scores:', scores)
            res.json(scores)
        })
        // res.json(fakeScores)
    })

    app.post('/api/scores/add', (req, res) => {
        console.log('adding score!', req.body)
    })
}
