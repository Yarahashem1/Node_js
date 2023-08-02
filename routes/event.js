const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const { check, validationResult } = require('express-validator')
const moment = require('moment');
moment().format();

// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

//create new events

router.get('/creat',isAuthenticated, (req,res)=> {

    res.render('events/creat', {
        errors: req.flash('errors')
    })
})
// route to home events
router.get('/:pageNo', async (req, res) => {
    try {
      let pageNo = 1;
      if (req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo);
      }
      if (req.params.pageNo == 0) {
        pageNo = 1;
      }
  
      let q = {
        skip: 6 * (pageNo - 1),
        limit: 6,
      };
  
      // Find total documents
      let totalDocs = await Event.countDocuments();
  
      // Fetch paginated events
      const events = await Event.find({}).skip(q.skip).limit(q.limit);
  
      let chunk = [];
      let chunkSize = 3;
      for (let i = 0; i < events.length; i += chunkSize) {
        chunk.push(events.slice(i, chunkSize + i));
      }
  
      res.render('events/index', {
        chunk: chunk,
        message: req.flash('info'),
        total: parseInt(totalDocs),
        pageNo: pageNo,
      });
    } catch (err) {
      // Handle the error appropriately
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
// save event to db

router.post('/creat', [
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 char'),
    check('location').isLength({min: 3}).withMessage('Location should be more than 5 char'),
    check('date').isLength({min: 5}).withMessage('Date should valid Date'),

] , (req,res)=> {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        req.flash('errors',errors.array())
        res.redirect('creat')
    } else {
        
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            user_id:  req.user.id,
            created_at: Date.now()
        })
   
        async function saveEvents() {
            try {
          
                await newEvent.save();
                req.flash('info', ' The event was created successfuly')
               // console.log(event);
               res.redirect('/events/:pageNo')
             
            } catch (err) {
              console.error(err);
            } 
          }
          saveEvents()
    }
   
})


router.post('/update', [
    check('title').isLength({ min: 5 }).withMessage('Title should be more than 5 char'),
    check('description').isLength({ min: 5 }).withMessage('Description should be more than 5 char'),
    check('location').isLength({ min: 3 }).withMessage('Location should be more than 3 char'), // Changed from 5 to 3
    check('date').isLength({ min: 5 }).withMessage('Date should valid Date'),

], isAuthenticated, (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.redirect('/events/edit/' + req.body.id);
    } else {

        let newEvent = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
        };

        let query = { _id: req.body.id };

        async function updateEvents() {
            try {
                await Event.updateOne(query, newEvent);
                req.flash('info', 'The event was updated successfully');
                res.redirect('/events/:pageNo' + req.body.id);
            } catch (err) {
                console.error(err);
            }
        }

        updateEvents();
    }
});
router.get('/edit/:id',isAuthenticated, async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });
        if (event) {
            res.render('events/edit', {
                event: event,
                eventDate: moment(event.date).format('YYYY-MM-DD'),
                errors: req.flash('errors'),
                message: req.flash('info')
            });
        } else {
            res.status(404).send('Event Edit not found');
        }
    } catch (err) {
        console.log(err);
    }
});
// show single event
router.get('/show/:id', async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });

        if (event) {
            res.render('events/show', { event: event });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

//delete event

router.delete('/delete/:id',isAuthenticated,async (req,res)=> {

    let query = {_id: req.params.id}

    const event=await Event.deleteOne(query)
    try{
        res.status(200).json('deleted') 
    }
    catch(err){
        res.status(404).json('There was an error .event was not deleted') 
    }
})

module.exports = router 