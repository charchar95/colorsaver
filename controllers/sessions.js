const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/users.js');

router.get('/new', (req, res)=>{
    res.render('sessions/new.ejs');
})
// Non bcrypt
// router.post('/', (req, res)=>{
//     User.findOne({ username: req.body.username }, (err, foundUser) => {
//         if(req.body.password == foundUser.password){
//           req.session.currentUser = foundUser
//             res.redirect('/')
//         } else {
//           res.send('wrong password')
//         }
//     });
// });

router.delete('/', (req, res)=>{
    req.session.destroy( () => {
        res.redirect('/')
    });
});

router.post('/', (req, res) => {
User.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
    if( bcrypt.compareSync(req.body.password, foundUser.password) ){
        req.session.currentUser = foundUser;
        res.redirect('/');
    } else {
        res.send('<a href="/">wrong password</a>');
    }
})
})


module.exports = router;