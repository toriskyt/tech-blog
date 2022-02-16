const router = require('express').Router()
const homeroutes = require('./homeroutes')
const dashroutes = require('./dashroutes')
const apiroutes = require('./api')

router.use("/", homeroutes)
router.use("/dashboard", dashroutes)
router.use("/api", apiroutes)

module.exports = router