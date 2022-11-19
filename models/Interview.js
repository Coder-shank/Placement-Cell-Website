const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    Company_Name: {
      type: String,
      required: true,
    },

  
    Student: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "StudentsCollection",
      required: true,
     
    },
    Date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },

    Result :{
        type: String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

//name of our collection in database
const interviewCollection = mongoose.model("interviewCollection", interviewSchema);

module.exports = interviewCollection;
