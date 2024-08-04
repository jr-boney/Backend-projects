import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import { mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json())


app.get("/",(req,res) => {
    console.log(req);
    return res.status(234).send("welcome bruh")
})



app.post('/boos',async (req,res) => {
try {
    if(
    !req.body.title ||
    !req.body.author ||
    !req.body.publishYear
){
    return res.status(400).send({message: 'Require all fieds: title, author, publishYear'})
}
const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
};
const book = await Book.create(newBook);
return res.status(201).send(book);
}
catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message})
}
})


mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App is connected to database")
    app.listen(PORT,() => {
        console.log(`App is listening to port: ${PORT}`);
    });

   
})
.catch((error) => {
    console.log(error)
})