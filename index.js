const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')

const app = express()

// connect mongoose
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connection successfull!'))
.catch((err) => {
    console.log(err)
})

// read properties
app.use(express.json())

// routing
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send('[HOME route]')
})

// server listening
app.listen(process.env.PORT || 1999, () => {
    console.log(`SERVER listening on PORT: http://localhost:1999`)
})