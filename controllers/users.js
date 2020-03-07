const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require("../models/users.js")

router.get('/new', (req, res) => {
  res.render('users/new.ejs')
});

// router.post('/', (req, res) => {
//     User.create(req.body, (err, createdUser) => {
//       if (err) {
//         console.log(err)
//       }
//       console.log(createdUser);
//       res.redirect('/')
//     });
//   });

router.post('/', (req, res) => {
//overwrite the user password with the hashed password, then pass that in to our database
  req.body.username = req.body.username
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {    
        res.redirect('/')
    });
});
  
module.exports = router