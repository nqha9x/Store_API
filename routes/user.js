const express = require('express')
const router = express.Router()
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken.js')
const User = require('../models/User.js')

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.Rabbit.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedUser)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted!")
    }catch(err) {
      res.status(500).json(err)
    }
})

// GET USER by id
router.get('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const user =  await User.findById(req.params.id)
        res.status(200).json({user})
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const users =  await User.find(req.params.id)
        res.status(200).json({users})
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router