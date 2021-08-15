const router = require('express').Router()
module.exports = router
const { models: { Order, User, Orderline, Product }} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const cart = await Order.findAll({
      include: [{ model: User}, 
                { model: Orderline, include: Product }],
      where: {type: 'cart', userId: userId}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/cartItems/:id', async (req, res, next) => {
  try {
      const cartItem = await Orderline.findByPk(req.params.id);
      await cartItem.destroy();
      res.sendStatus(202);
  }
  catch(err) {
      next(err);
  }
});