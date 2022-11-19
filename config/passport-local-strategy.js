//Modules
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//Model
const employeeCollection= require('../models/Employee')


passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true,
},(req,email,password,done)=> {
    employeeCollection.findOne({email: email}, (err, user) => {
        if (err) {
            // req.flash('error','Error in Finding User')
            console.log("Error in Finding User --> Passport")
            return done(err)
        }
        if (!user || user.password !== password) {
            // req.flash('error','Invalid Username/Password')
            console.log("Invalid Username/Password")
            return done(null, false)
        }
        return done(null, user)
    })
}))


//Serializing Model to Decide the field to store in cookie

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//Deserializing Data form cookie to a User Model

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if (err) {
            console.log("Error in Finding User --> Passport")
            return done(err)
        }
        if(!user) return done(null,false)
        else return done(null,user)
    })
})


passport.checkAuthentication = (req,res,next)=>{
    //If User is Signed in
    if(req.isAuthenticated()){
        return next();
    }
    //If User is Not Signed in
    else {
        // req.flash('error','Your Are Not Logged-in')
        return res.redirect("/register")
    }


}


passport.setAuthenticatedUser = (req,res,next) =>{
    if(req.isAuthenticated()){
        // User which the req have is sent to the res
        res.locals.user = req.user
    }
    next()
}



module.exports = passport;
