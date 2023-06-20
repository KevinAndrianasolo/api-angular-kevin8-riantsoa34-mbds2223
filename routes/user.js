var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../model/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// CREATES A NEW USER
// router.post('/', function (req, res) {
//     var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//     User.create({
//             name : req.body.name,
//             email : req.body.email,
//             password : hashedPassword,

//         }, 
//         function (err, user) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(user);
//         });
// });

// // RETURNS ALL THE USERS IN THE DATABASE
// router.get('/', function (req, res) {
//     User.find({}, function (err, users) {
//         if (err) return res.status(500).send("There was a problem finding the users.");
//         res.status(200).send(users);
//     });
// });

// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

// // DELETES A USER FROM THE DATABASE
// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem deleting the user.");
//         res.status(200).send("User: "+ user.name +" was deleted.");
//     });
// });

// UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });

function register (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
      nom : req.body.nom,
      photo : req.body.photo,
      email : req.body.email,
      password : hashedPassword,
      role: req.body.role
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id,role:user.role }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  };

   function getUserConnected(req, res,next) {
    var token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  
    token = token.replace("Bearer ", "");
    if (!token) return res.status(401).send({ auth: false, message: 'Pas de token' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
          res.status(200).send(user);
      });
    });
  }

   function login(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id,role:user.role }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  }
  function logout(req, res) {
    res.status(200).send({ auth: false, token: null });
}
  module.exports = { getUserConnected,register,login,logout };