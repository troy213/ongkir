const express = require('express')
const router = express.Router()

const { provinceGet, cityGet, costPost } = require('../controller/controller')

router.get('/province', provinceGet)
router.get('/city', cityGet)
router.post('/cost', costPost)

module.exports = router
