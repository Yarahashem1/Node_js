const express = require('express')
const routere = express.Router()
const User = require('../models/User')
const passport = require('passport')
const multer = require("multer")
// configure multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png') 
    }
  })
  
  var upload = multer({ storage: storage })


// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

routere.post('/uploadAvatar', upload.single('avatar'), (req,res)=> {
    
    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne( {_id: req.user._id}, newFields,)
    .then(()=>res.redirect('/users/profile'))
    .catch((err)=>console.log(err))
   
   
})


//  login user view 
routere.get('/login', (req,res)=> {
    res.render('user/login', {
        error: req.flash('error')
    })
})

// login post request 
routere.post('/login',
passport.authenticate('local.login', {
  successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true })
    )

// sign up form 
routere.get('/signup', (req,res)=> {
    res.render('user/signup', {
        error: req.flash('error')
    })
})

// sign up post request

routere.post('/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true })
      )

// progile 
routere.get('/profile',isAuthenticated, (req,res)=> {
    res.render('user/profile', {
        success: req.flash('success')
    })
})
// logout user

routere.get('/logout', (req, res) => {
    try {
        req.logout(function(err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/users/login');
        });
    } catch (err) {
        console.log(err);
    }
});



module.exports = routere