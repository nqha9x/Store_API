const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const orderRoute = require('./routes/order.js')
const cartRoute = require('./routes/cart.js')

const app = express()

// connect mongoose
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to DB!'))
.catch((err) => {
    console.log(err)
})

// read properties
app.use(express.json())

// routing
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)

app.get('/', (req, res) => {
    res.send('[HOME route]')
})

// server listening
app.listen(process.env.PORT || 1999, () => {
    console.log(`SERVER listening on PORT: http://localhost:1999`)
})