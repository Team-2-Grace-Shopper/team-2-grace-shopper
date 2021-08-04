const router = require('express').Router()
module.exports = router
const { models: { Order, User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await Order.findAll({
      attributes: ['id', 'orderDate', 'status', 'type'],
      include: [User],
      where: {type: 'order'}
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
