'use strict'

const {Plans} = require('.../models')
const { where } = require('sequelize')

const getPlansById = async (planId) => {
  const plan = await Plans.findOne({
    where: {
      id: planId
    }
  })

  return plan
}

const getAllPlans = async () => {
  const plans = await Plans.findAll({
    where: {
      isActive: true
    }
  })
  return plans
}

module.exports = {
  getPlansById,
  getAllPlans
}