'use strict'

const {Router} = require('express')
const subscriptions = Router()
const {suscribePlanController, getActiveSubscription, changePlan} = require('../controllers/suscriptionsController')
const {authMiddleware} = require('../middlewares/authMiddleware')

// suscribirse a un plan
subscriptions.post('/subscribe', authMiddleware, suscribePlanController)
// obtener suscripcion activa
subscriptions.get('/subscription', getActiveSubscription)
// cambiar de plan
subscriptions.put('/subscription', changePlan)


module.exports = subscriptions

