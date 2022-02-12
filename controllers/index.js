const router = require('express').Router()
const homeroutes = require('./homeroutes')
const dashroutes = require('./dashroutes')

router.use("/", homeroutes)
router.use("/dashboard", dashroutes)

module.exports = router