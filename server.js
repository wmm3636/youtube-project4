var db;
var gfs;
console.log("Hello: ");

//we use express in server.js by requiring it

const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(bodyParser.json());

var Grid = require('gridfs-stream');

var ObjectId = require('mongodb').ObjectId;

// Mongo DB Connection

const mongo = require('mongodb')

mongo.MongoClient.connect('mongodb://feroz:mongo4@ds113626.mlab.com:13626/youtube', (err, database) => {
    
 gfs = new Grid(database,mongo);  
  if (err) return console.log(err)
  db = database;
 app.listen(4000, () => {
  console.log('listening on 4000')
 })
})



app.get('/', (req, res) => {
  db.collection('Videos1').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    
     var readstream = gfs.createReadStream({
    
    filename: 'youtube.png'
});

       var bufs = [];
     readstream.on('data', function(chunk) {
         
          bufs.push(chunk);
      
    });

    readstream.on('end', function() {
        
        var fbuf = Buffer.concat(bufs);

        var base64 = (fbuf.toString('base64'));
       
       // console.log(base64);
     // res.send('<img src="data:image/jpg;base64,' + base64 + '">');
        result.base = base64;
         
         res.render('index.ejs', {info: result})
    });

      readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });      
      
  })
    
})

app.get('/desc.ejs', (req, res) => {
   
    var value = req.query.id;
    console.log(value);
    db.collection('videos').find({'_id': ObjectId(value)}).toArray((err, result) => {
    if (err) return console.log(err)    
        
        
        
    res.render('desc.ejs', {info: result})                                                           
    })    
    
   // res.render('desc.ejs',res)
})



app.post('/search', (req, res) => {
    
    
    var value = req.body.search;
  
     var str = "\\b" + value + ".*";
        console.log(str);
     db.collection('videos').find({title: {$regex : new RegExp(str , "i")}}).limit(15).toArray((err, result) => {
    if (err) return console.log(err)
         result.flag = 1;
   
         
     var readstream1 = gfs.createReadStream({
    
    filename: 'youtube.png'
});

       var bufs = [];
     readstream1.on('data', function(chunk) {
         
          bufs.push(chunk);
      
    });

    readstream1.on('end', function() {
        
        var fbuf = Buffer.concat(bufs);

        var base64 = (fbuf.toString('base64'));
       
      
     // res.send('<img src="data:image/jpg;base64,' + base64 + '">');
        result.base = base64;
         
         res.render('index.ejs', {info: result})
    });

      readstream1.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });      
           
         
    
   
    })
   
 })




app.post('/addcomment', (req, res) => 
{
  //  console.log(req.body); 
    var id1 = req.body.id;
    var name = req.body.comment;
    
  console.log(id1);
    console.log(name);
    
 db.collection('videos').findOneAndUpdate({_id:ObjectId(id1)},{$addToSet:{'comments':name}},{sort: {_id: -1},upsert: true},(err, result) => 
{
    if (err) return res.send(err)
     //console.log(result);
     res.redirect('/desc.ejs?id='+id1);
   // res.send(result)
  
 })
    
    
})

