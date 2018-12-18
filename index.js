const keys = require('./config/keys')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(keys.mongoURI)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Check Token
app.use(
    expressJwt({ secret: keys.secretKey }).unless({
        path: [
            // Public routes that don't require authentication
            '/user/sign_in',
            '/user/sign_up',
            '/item/get_all_items',
            '/item/get_detail_item/:id',
            '/item/search_items',
            /\/images*/
        ]
    })
)
// router.get('/', (req, res, next) => {
//     res.json('Test Root')
// })
// app.use('/', router)
app.use('/item', require('./routes/itemRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/order', require('./routes/orderRoutes'))

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token...')
    }
})
//Static Files
app.use(express.static('public'))
//<img src="http://localhost:5000/images/id1.jpeg" />

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
