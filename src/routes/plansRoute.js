'use strict'
const {Router} = require('express')
const plans = Router()
const {getPlans} = require('../controllers/plansController')

// lista de todos los planes
plans.get('/plans', getPlans)

module.exports = plans