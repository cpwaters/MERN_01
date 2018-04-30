const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Requiring the Scema method from mongoose

//Create Schema and model
const PersonSchema = new Schema({ //This is the layout of what information the model will be looking for when information is passed to it.
    chap: {
        firstName:String,
        surname:String,
        age:Number
    }
});

// Create a model
const Person  = mongoose.model('peeps', PersonSchema); // 'jobchar' is the 'collection' name of the model and uses the 'JobCharSchema' as its ruleset

module.exports = Person; //This will create an export structure for incoming data.