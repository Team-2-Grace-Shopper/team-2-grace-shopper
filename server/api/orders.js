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
    const orders = await Order.findAll({
      include: [{ model: User}, 
                { model: Orderline, include: Product }],
      where: {type: 'order', userId: userId},
      order: [ ['status', 'ASC'], ['orderDate', 'DESC'] ]
//      where: {type: 'order', userId: userId, status: 'closed'}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.upsert(req.body, {returning: true} );
    res.send(order[0].dataValues);
  } catch (err) {
    next(err);
  }
});

router.post("/line", async (req, res, next) => {
  try {
    const orderline = await Orderline.create(req.body, {returning: true} );
    res.send(orderline);
  } catch (err) {
    next(err);
  }
});