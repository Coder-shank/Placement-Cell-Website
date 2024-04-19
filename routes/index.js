const express = require('express');

const router = express.Router();

const homeController= require('../controllers/home_controller');
const passport= require('passport');
const {Parser} = require('json2csv');

//home page
router.get('/', homeController.firstPage);



//employee sign in ,sign-Up

router.get('/signUp.ejs', passport.authenticate('local', { failureRedirect: '/signUp.ejs', failureMessage: true }),
homeController.signUp) ;
router.get('/signUpUser567emp',homeController.signUp) ;
router.post('/create', homeController.create);

router.get('/signIn.ejs',homeController.signIn);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/signIn.ejs', failureMessage: true }),
homeController.createSession) ;

// students related

// router.get('/', homeController.home);

//this is working fine
router.get('/Students/SsignUp', homeController.SsignUp);
router.post('/Students/create', homeController.addStudent);

//this is working fine
//this interview must be written before params route , otherwise it will give error
//help.ejs ..
//this is final
router.get('/Students/InterviewHome', homeController.InterviewHome);
//
// router.get('/Students/interviewForm', homeController.interviewForm)
// there can be some issue in redirect..
router.post('/Students/scheduleInterview',  homeController.scheduleInterview);


//these both are working fine

router.post('/Students/InterviewHome/:id/Save', homeController.reportSave);
router.get('/Students/InterviewHome/:id', homeController.interviewDetails);
router.post('/Students/InterviewHome/:id/', homeController.resultUpdate);
router.get('/Students/:id', homeController.studentDetails);

module.exports = router;




























