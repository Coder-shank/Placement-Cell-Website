const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/placement-cell');

// mongoose is connected to mongodb
//but it is not stored in any variable..so..
//now we need to store this connection in a variable so that we can use mongodb database.
const db = mongoose.connection;

//below line is not must but it helps us in debugging
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
} );

module.exports =  db 

