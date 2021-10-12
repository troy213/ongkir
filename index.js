const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
PORT = process.env.PORT || 5000

const router = require('./router/route')

app.use([cors(), express.json(), express.urlencoded({ extended: false })])
app.use('/', router)

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Hello from server' })
})

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: '404 Not Found' })
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
