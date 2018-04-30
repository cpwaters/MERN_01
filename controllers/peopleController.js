const bodyParser = require('body-parser');
const Person = require('../models/data');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const events = require('events');

//Dummy data
//var data = ;

var urlencodedParser = bodyParser.urlencoded({extended: false});

mongoose.Promise = global.Promise;

module.exports = router 

    //get a list of people from the db
    router.get('/people', urlencodedParser, function(req,res){
               res.sendFile(__dirname + '/index.html');
                });
           
     
    
  //add a new person to the db
    router.post('/people', urlencodedParser, function(err,req,res,next){
        Person.create(req.body).then(function(people){
            res.send(people);   
        });
    });
  
//update a person in the db
router.put('/people/:id', urlencodedParser, function(req,res){
    Person.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Person.findOne({_id: req.params.id}).then(function(people){
            res.send(people);
        });
    });
}); 

    //Delete a person from the db
router.delete('/people/:id', function(req,res){
    Person.findByIdAndRemove({_id: req.params.id}).then(function(people){
        res.send(people);
    })
});

module.exports = router 