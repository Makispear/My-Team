const express = require('express')
const router = express.Router()

router.use(require('./connection'))

module.exports = router