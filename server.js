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
const colorController = require('./controllers/colors.js');

app.use('/users', userController)
app.use('/sessions', sessionsController)
app.use('/colors', colorController);



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

// router.get('/' , (req, res) => {
//   // res.render('index.ejs', {
//     Color.find({}, (err, foundColors)=>{
//       res.render('index.ejs', {
//         color: foundColors,
//         currentUser: req.session.currentUser,
//   }) 
// })
// });

// NEW //
app.get('/new', (req, res) => {
if (req.session.currentUser) {
  res.render('new.ejs', {currentUser: req.session.currentUser});
} else {
  res.redirect("sessions/new")
}
});

//EDIT //
app.get('/:id/edit', (req, res) => {
if(req.session.currentUser){
  res.render('edit.ejs', {
      id: req.params.id, 
      currentUser: req.session.currentUser
  });
} else {
  res.redirect("/");
};
});

// SHOW //
app.get('/:id/', (req, res) => {
  Color.findById( req.params.id, (err, foundColor) => {
  res.render('show.ejs', {
  color: foundColor,
  currentUser: req.session.currentUser, 
  id: req.params.id,
  });  console.log(err)
})
}); 

// UPDATE //
app.put("/:id", (req, res) => {
// console.log(req.body);
if (req.session.currentUser) {
  req.body.username = req.session.currentUser.username;
  Color.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      (err, foundColor) => {
      res.redirect('/');
  });
}
});



// CREATE //
app.post('/', (req, res) => {
console.log(req.body);
req.body.username = req.session.currentUser.username;
Color.create(req.body, (err, result) => {
  // console.log(result);
  res.redirect('/');
});
});

// DELETE //
app.delete('/:id', (req, res) => {
if(req.session.currentUser) {
  Color.findByIdAndRemove(req.params.id, (err, updatedColor) => {
      res.redirect('/');
  });
} else {
  res.redirect('/');
};
});



// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log( 'Listening on port:', PORT))