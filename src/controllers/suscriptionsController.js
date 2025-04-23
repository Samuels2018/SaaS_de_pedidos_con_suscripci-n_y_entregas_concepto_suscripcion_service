'use strict'
const {suscribePlanService, existingSubscription} = require('../services/suscriptionsService')
const {getPlansById} = require('../services/planService')
const {calculateNextBillingDate} = require('../helpers/calculateNextBilling')

async function suscribePlanController (req, res) {
  console.log(req.body)

  const {userId, planId, status, startDate, endDate, nextBillingDate} = req.body

  if (!planId) {
    return res.status(400).json({error: 'Plan ID is required'})
  }

  try {
    const plan = await getPlansById(planId)
    if (!plan) {
      return res.status(404).json({error: 'Plan not found'})
    }

    const existentSubscription = await existingSubscription(userId)
    if (existentSubscription) {
      return res.status(400).json({error: 'User already has an active subscription'})
    }

    const startDate = new Date()
    const endDate = null
    const nextBillingDate = calculateNextBillingDate(startDate, plan.billingCycle)

    const newSuscription  = await suscribePlanService(userId, planId, status, startDate, endDate, nextBillingDate)
    if (!newSuscription) {
      return res.status(500).json({error: 'Error creating subscription'})
    }

    res.status(201).json({
      message: 'Subscription created successfully',
      suscription: {
        ...newSuscription.toJSON(),
        plan: plan
      }
    })


  } catch (err) {
    console.log(err)
    return res.status(500).json({error: 'Internal server error'})
  }

}

async function getActiveSubscription (req, res) {
  console.log(req.body)
}

async function changePlan (req, res) {
  console.log(req.body)
}

module.exports = {
  suscribePlanController,
  getActiveSubscription,
  changePlan
}