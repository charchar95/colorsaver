const express = require('express');
const router = express.Router();

const User = require('../models/users.js');
const Color = require('../models/colors.js');


// // INDEX // 
// router.get('/color',  (req, res) => {
//   if (req.session.currentUser) {
//     res.render('colors/index.ejs')
//   }
// }); 

// // NEW //
// router.get('/new', (req, res) => {
//   if (req.session.currentUser) {
//     res.render('new.ejs')
//   } else {
//     res.redirect("session/new")
//   }
// });

// //EDIT //
// router.get('/:id/edit', (req, res) => {
//   if(req.session.currentUser){
//       res.render('/views/colors/edit.ejs', {
//           id: req.params.id, 
//           currentUser: req.session.currentUser
//       });
//   } else {
//       res.redirect("/");
//   };
// });

// // UPDATE //
// router.put("/:id", (req, res) => {
//   // console.log(req.body);
//   if(req.session.currentUser) {
//       req.body.username = req.session.currentUser.username;
//       Color.findByIdAndUpdate(
//         req.params.id, 
//         req.body, 
//         (error, foundColor) => {
//           res.redirect('/colors');
//       });
//   }
// });

// // SHOW //
// router.get('/:id', (req, res) => {
//   if(req.session.currentUser){
//       Color.findById(req.params.id, (error, foundColor) => {
//           res.render('/colors/show.ejs', 
//             {color: foundColor, 
//             currentUser: req.session.currentUser, 
//             id: req.params.id
//             });
//       });
//   } else {
//       res.redirect('/');
//   };
// });

// // CREATE //
// router.post('/colors', (req, res) => {
//   // console.log(req.body);
//   req.body.username = req.session.currentUser.username;
//   Color.create(req.body, (error, result) => {
//       // console.log(createdTicket);
//       res.redirect('/');
//   });
// });

// // DELETE //
// router.delete('/:id', (req, res) => {
//   if(req.session.currentUser) {
//       Color.findByIdAndRemove(req.params.id, (error, updatedColor) => {
//           res.redirect('/colors');
//       });
//   } else {
//       res.redirect('/colors');
//   };
// });




module.exports = router;