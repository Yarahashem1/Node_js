const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/User')

// saving user object in the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
  });

passport.use('local.signup', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req,username,password, done)=> {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'))
    } else {
        try{
          const user=await User.findOne({email: username})
          
          if(user) {
            return done(null, false, req.flash('error', 'Email already used'))
        }

        if (!user) {
            //create user
            let newUser = new User()
            newUser.email = req.body.email
            newUser.password = newUser.hashPassword(req.body.password)
            newUser.avatar = "profile.png"
            async function saveUsers() {
                try {
                    await newUser.save();
                    return done(null, newUser, req.flash('success', 'User Added')); // Change 'user' to 'newUser'
                } catch (err) {
                    return done(err);
                }
            }
              saveUsers()
           
        }
        }
        catch(err){
            return done(err)
        }
     
    }
}))



passport.use('local.login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,username,password, done)=> {

    //find user
    User.findOne({email: username}).then(user =>{
        if(!user) {
            return done(null, false, req.flash('error', 'user was not found'))
        }
        else{
            if (user.comparePasswords(password, user.password)) {

                return done(null,user, req.flash('success', ' welcome back'))

            } else {
                return done(null,false, req.flash('error', ' password is wrong'))

            }
        }
    })
    .catch(err =>{
        return done(null, false, req.flash('error', 'Something wrong happened'))
    })
  
}))