const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.Rabbit.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json('Wrong information!')

        const hashedPassword = CryptoJS.Rabbit.decrypt(user.password, process.env.PASS_SEC)
        const password = hashedPassword.toString(CryptoJS.enc.Utf8)        

        password !== req.body.password && res.status(401).json('Wrong information!')   
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,            
        }, 
        process.env.JWT_SEC,
        {expiresIn: '1d'}
        )

        res.status(200).json({user, accessToken})
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router