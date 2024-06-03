
// const mongoose = require('mongoose');

// const jokeSchema = mongoose.Schema({
//     jokeQuestion: {
//         text: String , 
//         require :[true, "Enter the question please"]
//     }, 
//     jokeAnswer:{
//         text: String, 
//         require: [true, "Answer are required"]
//     }, 
// })

// module.exports = mongoose.model("Joke", jokeSchema );



const mongoose = require('mongoose');

const jokeSchema = mongoose.Schema({
    jokeQuestion: {
        type: String,
        required: [true, "Enter the question please"]
    }, 
    jokeAnswer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    timestamps: true // Add timestamps to the schema
});

module.exports = mongoose.model("Joke", jokeSchema);