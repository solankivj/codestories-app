const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const key = require('../../config/keys');

// Load User Model
const User = require('../../models/User');

router.post('/', (req, res) => {
  const newUser = new User({});
  
  newUser.save().then((user) => {
    const payload = { id: user.id };

    //Sign Token
    jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      if(err) return err.message
      return res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
  })
});

module.exports = router;
