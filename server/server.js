const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config()
const app = express()
const PORT = process.env.PORT || 8800
const school = require('./routes/schoolRoutes')
const user = require('./routes/userRoutes')
const student = require('./routes/studentRoutes')
const connection = require('./model/db')

const corsURL = process.env.CORS_URL || ''

const whitelist = corsURL.split(',').map(item => item.trim())

const corsOptions = {
    origin: (origin, callback) => whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
}

app.use(cors(corsOptions))
// app.use(cors())
app.use(logger('dev'))
app.use(express.json())



connection.connect(err => {
    if (err) {
        console.log('error connecting: ', err)
        return
    }
    console.log('MySQL database connected successfully')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/school', school)
app.use('/student', student)
app.use('/user', user)