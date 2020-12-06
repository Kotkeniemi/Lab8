const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { response } = require('express');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({extended:true}));
//create schema
let books = []
const bookSchema = {
    Title: String,
    Author:String,
    Publisher: String,
    Date: Date,
    URL: String
}
const node = mongoose.model("node", bookSchema)

app.get('/',function(req,response){
    response.sendFile(__dirname +"/index.html");
})
MongoClient.connect('mongodb://localhost:27017/mydb', (err,db) =>{

app.post('/', (req,res)=> {
    res.send(`
    <form method='post action='/bookList>
    <button> view database </button>
    </form>`);
    let newBook = new node ({
        Title: req.body.Title ,
        Author: req.body.Author,
        Publisher: req.body.Publisher,
        Date: req.body.Date,
        URL: req.body.URL
    })
    db.collection('bookCollection').insert(newBook, function(err,response) {
        if(err) {
            console.log('err')  
        }
        else{
            newBook.save();
            console.log('all good')
            books.push(newBook);
            response.redirect('/')
        }
            })
        })
});
app.get('/bookList', function(req,res) {
    res.json(books);


})

app.listen(3000,function(){
    console.log('hi');
})