const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/data');
//const routes = require('./controllers/peopleController');


//set up app 
const app = express();

// Connecting to (MongoDB NoSQL)
mongoose.connect('mongodb://localhost/people');

mongoose.connection.once('open', function(){        
    console.log('Connected to the database...');                                      
}).on('error', function(error){                     
    console.log('Connection error', error);        
});

//static files
app.use(express.static('./public'));

// using body-parser middleware
app.use(bodyParser.json());

// import of routes that the api uses
//app.use(routes);

//setting the view engine
app.set('view engine', 'ejs');

//fire controllers
//peopleController(app);

//listen to port
app.listen(process.env.port || 4000, function(){
    console.log('Server is live on port 4000..')
});

var urlencodedParser = bodyParser.urlencoded({extended: false});

mongoose.Promise = global.Promise;

//handlers
app.get('/', urlencodedParser, function(req,res,next){
    //res.sendFile(__dirname + '/index.html');
    Person.find({chap:[req.query.firstName,req.query.surname,parseFloat(req.query.age)]}).then(function(peeps){
        res.send(peeps);
    }).catch();
});

//add a new person to the db
app.post('/post', urlencodedParser, function(req,res,next){
    Person.create(req.body).then(function(people){
        res.send(people);   
    }).catch();
});

//update a person in the db
app.put('/update/:id', urlencodedParser, function(req,res,next){
Person.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Person.findOne({_id: req.params.id}).then(function(people){
        res.send(people);
    }).catch();
});
}); 

//Delete a person from the db
app.delete('/delete/:id', function(req,res,next){
Person.findByIdAndRemove({_id: req.params.id}).then(function(people){
    res.send(people);
}).catch();
});
