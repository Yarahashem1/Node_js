const express = require('express')
const app = express()
const port = 9000

const db = require('./config/database')

const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

const events = require('./routes/event')
// bring user routes
const users = require('./routes/user-routes')
app.set('view engine','ejs')

// bring body parser 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// session and flash config .
app.use(session({
    secret: 'yara',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())
// bring passport 
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req,res,next)=> {
    res.locals.user = req.user || null
    next()
})

app.use('/events', events)
app.use('/users', users)
app.use(express.static('public'))
app.use(express.static('node_modules'))


app.get('/', (req,res)=> {

    res.redirect('/events')
     
 })

app.listen(port, ()=> 
console.log(`Dolphin app listening on port ${port}!`)
)