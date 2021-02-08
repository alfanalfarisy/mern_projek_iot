const moment = require('moment');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const sendEmail = require('../../config/email_send')
const msgs = require('../templates/email/msg')
const templates = require('../templates/email/templates')
const validateRegisterInput = require("../validation/users/register");
const validateLoginInput = require("../validation/users/login");
const keys = require("../../config/keys");

// Load User model
const {User} = require("../models/rootModels");

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  User.findOne({
        $or: [{
            email: req.body.email
        }, {
            userName: req.body.userName
        }]
    }) 
  .then((user,err) => {
        if (user) {
            let errors = {};
            if (user.userName === req.body.userName) {
                errors.userName = "User Name already exists";
            } else {
                errors.email = "Email already exists";
            }
            return res.status(422).json(errors);
        }
          if (!isValid) {
            return res.status(422).json(errors);
          }
        const newUser = new User({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          numberPhone: req.body.numberPhone,
          email: req.body.email,
          password: req.body.password,
          confirmed : false
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                console.log(user)
                sendEmail(req.body.email, templates.confirm(user._id))
                res.json(user)
              })
              .catch(err => {
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                  return res.status(422).json({ userName: 'User already exist!' });
                }
              });
          });
        });
      // }
    }).catch(err=>console.log(err));

}

exports.login = (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else if (!user.confirmed){
      return res.status(404).json({ emailnotfound: "Email must be verified" });
    } else {
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            userName: user.userName
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 30000 // 1 year in seconds
            },
            (err, token) => {
              res.cookie("token",token,{httpOnly: true})
              res.json({
                success: true,
                token: "token" + token
              });
            }
          );
        } else {
          return (
            res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" })
            )
        }
      });

    }
  });
}

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => {

      // A user with that id does not exist in the DB. Perhaps some tricky 
      // user tried to go to a different url than the one provided in the 
      // confirmation email.
      if (!user) {
        res.json({ msg: msgs.couldNotFind })
      }
      
      // The user exists but has not been confirmed. We need to confirm this 
      // user and let them know their email address has been confirmed.
      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.confirmed }))
          .catch(err => console.log(err))
      }

      // The user has already confirmed this email address.
      else  {
        res.json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
}