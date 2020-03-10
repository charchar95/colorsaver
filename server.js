// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const hashedString = bcrypt.hashSync('itstuesdaylemon', bcrypt.genSaltSync(10));
const session = require('express-session');

// =======================================
//              PORT
// =======================================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI


// =======================================
//              MIDDLEWARE
// =======================================

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use('/public', express.static('public'));

app.use(
  session({
    secret: "itstuesdaylemon", //some random string
    resave: false,
    saveUninitialized: false
  })
);

// =======================================
//              DATABASE   
// ======================================= 
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + `colorsaver`;

// Mongo //
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

const User = require('./models/users.js')    
const Color = require('./models/colors.js')   

// Mongo - Error / success //
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});



const userController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions.js')
const colorController = require('./controllers/color.js')

app.use('/users', userController)
app.use('/sessions', sessionsController)
app.use('/colors', colorController)



// =======================================
//              ROUTES
// ======================================= 
app.get('/' , (req, res) => {
  // res.render('index.ejs', {
    Color.find({}, (err, foundColors)=>{
      res.render('index.ejs', {
        color: foundColors,
        currentUser: req.session.currentUser,
  }) 
})
});


// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log( 'Listening on port:', PORT))