const router = require('express').Router()
module.exports = router
const { ids } = require('webpack')
const { models: { Order, User, Orderline }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await Order.findAll({
      attributes: ['id', 'orderDate', 'status', 'type'],
      include: [User, Orderline],
      where: {type: 'order'}
    })
    res.json(users) // WHY IS THIS USERS?
  } catch (err) {
    next(err)
  }
})

router.get('/page', async (req, res, next) => {
  try {
    const { id, limit, offset } = req.query;
    console.log('IN API, req.params=', req.query)
    const orderss = await Order.findAll({
      attributes: ['id', 'orderDate', 'status', 'type'],
      include: [User, Orderline],
      where: {type: 'order', userId: id}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
