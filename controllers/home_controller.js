const employeeCollection = require('../models/Employee');
const StudentsCollection = require('../models/StudentsDetail');
const interviewCollection = require('../models/Interview');
const { findById } = require('../models/Employee');
const db = require('../config/mongoose');
const {Parser} = require('json2csv');
module.exports.firstPage =  function(req,res){
    return res.render('FirstPage')
}

module.exports.signUp = function(req,res){
    return res.render('signUp')
}


module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    employeeCollection.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            employeeCollection.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                return res.render('signIn');
               
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.signIn = function(req,res){
    return res.render('signIn')
};

module.exports.createSession =  async function(req,res){
    let students = await StudentsCollection.find({})
    return res.render('home',{students});

}

//students related ..
//basically this fn is not doing anything new ,its just that if control has came to this fn means
// it is already authenticated , session is created now take it to the profile page.
module.exports.SsignUp  =  function (req,res){
    return res.render('addStudents');
}


module.exports.studentDetails = async function (req,res) {
    let id = req.params.id;
    let student = await StudentsCollection.findById(id).populate("Interview")
    console.log(student);
    return res.render('studentDetails', { student})
}

module.exports.addStudent = function (req,res) {
    StudentsCollection.findOne({Name: req.body.Name}, function(err,user){
        if (err){
            console.log("error in finding user")
            return res.send("Error in error in finding user ")
            
        }
        
        if (user){
            console.log("user already exist");
            return res.redirect('/Students/SsignUp')
            
        }
        //we can create user then

        StudentsCollection.create(req.body);
        console.log("New Student Added Sucessfully")

        
       return res.redirect('/Students/SsignUp');

        

        } )}


//this is final    
module.exports.InterviewHome = async function (req,res){
    let interview = await interviewCollection.find({});
    return res.render('InterviewHome',{interview} )
}

module.exports.scheduleInterview = async function (req,res){

    let student = await StudentsCollection.findById(req.body.Student);
    let scheduledInterview = await interviewCollection.create(req.body);
    student.Interview.push(scheduledInterview._id)
    await student.save()
    return res.redirect('back');
  
}


module.exports.interviewForm = function (req,res){
    return res.render('InterviewForm')
}

module.exports.interviewDetails = async function (req,res) {
    let id = req.params.id;
    let interview = await interviewCollection.findById(id).populate("Student");
    // let interview = await interviewCollection.findById(id)
    return res.render('interviewDetails', { interview})
}


module.exports.resultUpdate = async function (req,res){   
    
    let interview1 = await interviewCollection.findById(req.body.Sid)
    
    
    interview1.Company_Name = "Wipro";
    interview1.Result = req.body.Result;
    await interview1.save();
    return res.redirect('back');
    
}

module.exports.reportSave = async function(req,res){
    const key = await interviewCollection.findById(req.body.Sid).populate('Student');
    const data = {
        "Student Name":             key.Student.Name,
        "Batch"       :             key.Student.Batch,
        "College"     :             key.Student.College,
        "Status"      :             key.Student.Status,
        "DSA_Final_Score":          key.Student.DSA_Final_Score,
        "WebD_Final_Score":         key.Student.WebD_Final_Score,
        "React_Final_Score":        key.Student.React_Final_Score,
        "Company Name":             key.Company_Name,
        "Date"        :             key.Date,
        "Current Result Status" :   key.Result
    }
    console.log(data)
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    res.attachment("information.csv")
    res.status(200).send(csv);
    

}









 
   

