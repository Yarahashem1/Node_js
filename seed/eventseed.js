const db = require('../config/database')
const Event = require('../models/Event')


let newEvents = [

    new Event({
        title: 'beach cleaning at Muscat',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '1',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Oman',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '2',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Nizwa',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '3',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '4',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '5',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '6',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '7',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '8',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sohar',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: '9',
        date: Date.now(),
        created_at: Date.now()
    }),
    
]

async function saveEvents() {
    try {
      for (const event of newEvents) {
        await event.save();
       // console.log(event);
      }
     
    } catch (err) {
      console.error(err);
    } 
  }
  console.log(newEvents.length);
  saveEvents();


