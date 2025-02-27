const express = require("express");
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtsecret = "abhiram"

router.post('/createuser',
  [body('email', 'invalid email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'incorrect password').isLength({ min: 5 })
  ],
  async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      }).then(res.json({ success: true }))
    } catch (err) {
      console.log(err)
      res.json({ success: false })
    }

  })


  router.post('/loginuser',
    [body('email', 'invalid email').isEmail(),
      body('password', 'incorrect password').isLength({ min: 5 })
      ],
    async (req, res) => {
      const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email
      try {
       let userData = await User.findOne({email})
       if(!userData){
        return res.status(400).json({errors:"Try login with correct credentials"})
       }

       let pwdcompare = await bcrypt.compare(req.body.password,userData.password)

       if(!pwdcompare){
        return res.status(400).json({errors:"Try login with correct credentials"})
       }

       const data = {
        user:{
          id:userData.id
        }
       }

       const authToken = jwt.sign(data,jwtsecret)

       return res.json({success : true,authToken:authToken})
      } catch (err) {
        console.log(err)
        res.json({ success: false })
      }
  
    })

module.exports = router