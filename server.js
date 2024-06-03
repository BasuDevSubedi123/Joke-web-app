
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Joke = require("./model/jokesmodel")
const path = require("path");


const port = 3010; 


const app = express();
app.use(express.static(path.join(__dirname, "public")));

//middle ware 
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@movies.abodagk.mongodb.net/?retryWrites=true&w=majority&appName=movies', { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/",async (req, res)=> {
   // res.status(200).sendFile(path.join(__dirname, "public", "homepage.html"));
})


app.get("/jokes",async (req, res)=> {
    const todo = await Joke.find();
    res.status(200).send(todo);
})

app.get("/jokes/:id",async (req, res)=> {
    const { id } = req.params;

    const todo = await Joke.findById(id);
    res.status(200).send(todo);
})

 app.post("/jokes" , async (req, res)=>{

    try{
        if (!req.body.question || !req.body.answer){
            return res.status(400).json({error : "Question and answer are required"});
        }

        const joke = new Joke({
        jokeQuestion: req.body.question,
        jokeAnswer: req.body.answer,
    } )

    const savejoke = await joke.save() ;
    res.status(200).json(savejoke)

    }catch(error){
        console.log(error)
         res.status(500).json({ error: 'An error occurred while saving the joke.' });
    }  
 })


 

app.put("/jokes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate request body
        if (!req.body.question || !req.body.answer) {
            return res.status(400).json({ error: "Question and answer are required" });
        }

        // Find joke by ID and update
        const joke = await Joke.findByIdAndUpdate(id, {
            jokeQuestion: req.body.question,
            jokeAnswer: req.body.answer
        }, { new: true });

        // Check if joke exists
        if (!joke) {
            return res.status(404).json({ error: "Joke not found" });
        }

        res.status(200).json(joke);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the joke." });
    }
});


app.delete("/jokes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find joke by ID and delete
        const joke = await Joke.findByIdAndDelete(id);

        // Check if joke exists
        if (!joke) {
            return res.status(404).json({ error: "Joke not found" });
        }

        res.status(200).json({ message: "Joke deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the joke." });
    }
});


app.listen(port, ()=>{
    console.log("server live on " + port);
})