
const express = require('express');
const router = express.Router()
const passport = require('passport')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys');

const validateSignup = require('../../validation/signup')
const validateLogin = require('../../validation/login')

router.get('/test', (req, res) => res.json({msg: 'this is a test'}))

router.post('/signup', (req, res) => {
    const {errors, isValid} = validateSignup(req.body)
    if(!isValid) {
        res.status(400).json(errors);
    }
    const { email, password } = req.body
    const newUser = new User({
        email,
        password
    })

    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err};
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    const payload = { id: user.id };
      
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      });
                    });
                  })
                .catch(err => console.log(err))
        })
    })
})


router.post('/login', (req, res)=> {
    const {error, isValid} = validateLogin(req.body)
    if(!isValid) {
        res.status(400).send(error)
    }

    const {email, password} = req.body

    User.findOne({email})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'user not exist'})
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({msg: 'Password does not match'})
                    }
                    payload = {id: user.id}
                    console.log(payload)

                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        // console.log(token)
                        res.json({
                            success: true,
                            token: 'Bear ' + token
                        })
                    })
                })
        })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=> {
    console.log(req.user)
    res.json({
        id: req.user.id
    })
})

module.exports = router