const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/events',
 {   useNewUrlParser:true}, 
 {

   
}).then(()=>{console.log('connected successfully')})
.catch((error)=>{console.log(error)})