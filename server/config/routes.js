// no need for controllers, very minimal routes

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
    app.get('/api/getScores', (req, res) => {
        res.json(fakeScores)
    })
}
