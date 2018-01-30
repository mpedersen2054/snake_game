
let mongoose = require('mongoose')

let scoreSchema = new mongoose.Schema({
    player: { type: String, required: true },
    score: { type: Number, required: true },
    speed: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Score', scoreSchema)
