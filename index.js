const keys = require('./config/keys')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(keys.mongoURI)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// router.get('/', (req, res, next) => {
//     res.json('Test Root')
// })

// app.use('/', router)
app.use('/item', require('./routes/itemRoutes'))
// app.use('/user', require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
