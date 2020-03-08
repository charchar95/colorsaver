const express = require('express');
const router = express.Router();

// const User = require('../models/users.js');
const Color = require('../models/colors.js');

// router.get('/' , (req, res) => {
//     // res.render('index.ejs', {
//       Color.find({}, (err, foundColors)=>{
//         res.render('index.ejs', {
//           color: foundColors,
//           currentUser: req.session.currentUser,
//     }) 
//   })
//   });
  
//   // NEW //
// router.get('/new', (req, res) => {
// if (req.session.currentUser) {
//     res.render('new.ejs', {currentUser: req.session.currentUser});
// } else {
//     res.redirect("sessions/new")
// }
// });
  
// //EDIT //
// router.get('/:id/edit', (req, res) => {
// if(req.session.currentUser){
//     res.render('edit.ejs', {
//         id: req.params.id, 
//         currentUser: req.session.currentUser
//     });
// } else {
//     res.redirect("/");
// };
// });

// // SHOW //
// router.get('/:id/show', (req, res) => {
// if(req.session.currentUser){
// Color.findById(req.params.id, (error, foundColor) => {
//     res.render('show.ejs', {
//     color: foundColor,
//     currentUser: req.session.currentUser, 
//     id: req.params.id 
//     });
//     })
// }
// }); 

// // UPDATE //
// router.put("/:id", (req, res) => {
// // console.log(req.body);
// if (req.session.currentUser) {
//     req.body.username = req.session.currentUser.username;
//     Color.findByIdAndUpdate(
//         req.params.id, 
//         req.body, 
//         (err, foundColor) => {
//         res.redirect('/');
//     });
// }
// });



// // CREATE //
// router.post('/', (req, res) => {
// console.log(req.body);
// req.body.username = req.session.currentUser.username;
// Color.create(req.body, (err, result) => {
//     // console.log(result);
//     res.redirect('/');
// });
// });

// // DELETE //
// router.delete('/:id', (req, res) => {
// if(req.session.currentUser) {
//     Color.findByIdAndRemove(req.params.id, (err, updatedColor) => {
//         res.redirect('/');
//     });
// } else {
//     res.redirect('/');
// };
// });
  




module.exports = router;