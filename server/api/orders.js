const router = require('express').Router()
module.exports = router
const { models: { Order, User, Orderline, Product }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ['id', 'orderDate', 'status', 'type'],
      include: [User, Orderline],
      where: {type: 'order'}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/page', async (req, res, next) => {
  try {
    const { userId, limit, offset } = req.query;
    console.log('IN API, req.params=', req.query)
    const orders = await Order.findAll({
      // attributes: ['id', 'orderDate', 'status', 'type'],
      include: [{ model: User}, 
                { model: Orderline, include: Product }],

      where: {type: 'order', userId: userId, status: 'closed'}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.get('/cart', async (req, res, next) => {
//   try {
//     const { userId } = req.query;
//     const orders = await Order.findAll({
//       include: [{ model: User}, 
//                 { model: Orderline, include: Product }],
//       where: {type: 'cart', userId: userId}
//     })
//     res.json(orders)
//   } catch (err) {
//     next(err)
//   }
// })