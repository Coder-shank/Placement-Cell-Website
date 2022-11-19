const mongoose = require('mongoose');

const studentsSchema =   new mongoose.Schema({
    Name: {
        type: String,
        required: true

    },
    Batch: {
        type: Number,
        required: true
    },

    College: {
        type: String,
        required: true

    },
    Status: {
        type: String,
        required: true

    },

   
    
        DSA_Final_Score: {
            type: Number,
            required:true
        },

        WebD_Final_Score:{
            type: Number,
            required: true
        },

        React_Final_Score: {
            type: Number,
            required:true

        },

        Interview: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "interviewCollection"
        }]
 
    
}, {
    timestamps:true
}
)

//name of collection

const StudentsCollection = mongoose.model('StudentsCollection', studentsSchema);

module.exports = StudentsCollection;

