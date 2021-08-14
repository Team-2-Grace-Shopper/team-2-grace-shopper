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

// router.get('/line', async (req, res, next) => {
//   try {
//     const { userId } = req.query;
//     const cart = await Order.findAll({
//       include: [{ model: User}, 
//                 { model: Orderline, include: Product }],
//       where: {type: 'cart', userId: userId}
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

router.post("/", async (req, res, next) => {
  try {
    const cart = await Order.create(req.body, {returning: true} );
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/line", async (req, res, next) => {
  try {
    const cart = await Orderline.create(req.body, { returning: true });
    res.json(cart);

  } catch (err) {
    next(err);
  }
});

// router.post("/line", async (req, res, next) => {

//   console.log("#USERS:", await User.count());
//   const id = req.body.id * 1;
//   try {
//     const cart = await Order.create(req.body, { where: { id: id } });
//     res.json(cart);
//   } catch (err) {
//     next(err);
//   }
// });