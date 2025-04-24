'use strict'
const {Subscriptions}  = require('.../models')

const suscribePlanService = async (userId, planId, status, startDate, endDate, nextBillingDate) => {
  const defaultData = {
    userId: userId || 1,
    planId: planId || 1,
    status: status || 'active',
    startDate: startDate || new Date(),
    endDate: endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    nextBillingDate: nextBillingDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  }

  console.log(defaultData)

  const [row, created] = await Subscriptions.findOrCreate({
    where: {
      userId: defaultData.userId,
      planId: defaultData.planId
    },
    defaults: defaultData
  })

  console.log(row, created)

  return {row, created}
}

const existingSubscription = async (userId) => {
  const suscription  = await Subscriptions.findOne({
    where: {
      userId: userId
    }
  })

  return suscription
}

const updatePlanService = async (userId, planId, status, startDate, endDate, nextBillingDate) => {
  const updatedSubscription = await Subscriptions.update({
    planId: planId,
    status: status,
    startDate: startDate,
    endDate: endDate,
    nextBillingDate: nextBillingDate
  }, {
    where: {
      userId: userId
    }
  })

  return updatedSubscription
}


module.exports = {
  suscribePlanService,
  existingSubscription,
  updatePlanService
}