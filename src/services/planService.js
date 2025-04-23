'use strict'

const {Plans} = require('.../models')

const getPlansById = async (planId) => {
  const plan = await Plans.findOne({
    where: {
      id: planId
    }
  })

  return plan
}

module.exports = {
  getPlansById
}