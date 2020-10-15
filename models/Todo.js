const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    user: {
        type: mongoose.isValidObjectId,
        required: true,
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model('Todo', TodoSchema)