const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys');
const passport = require('passport')

const validateSignup = require('../../validation/signup')
const validateLogin = require('../../validation/login')


router =  (res, path, query) => {
    if (path === 'signup')
    {const {errors, isValid} = validateSignup(query)
    if(!isValid) {
        res.status(400).json(errors);
    }
    const { email, password } = query
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
    })}
    else if (path === 'login') {
        const {error, isValid} = validateLogin(query)
        if(!isValid) {
            res.status(400).send(error)
        }
    
        const {email, password} = query
    
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
                            console.log(token)
                            res.json({
                                success: true,
                                token: 'Bear ' + token
                            })
                        })
                    })
            })
    }
    else  {
        res.json('this is user router')
    }
}




module.exports = router