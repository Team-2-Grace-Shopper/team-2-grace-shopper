const router = require('express').Router()
module.exports = router
const { models: { Product, Country } } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await Product.findAll({
      //attributes: ['id', 'name', 'price', 'inventory'],
      include: [Country]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//Shanntal change 8/9:
router.get('/coffee/:id', async (req, res, next) => {
  try {
    const coffee = await Product.findByPk(req.params.id)
    res.send(coffee)
  } catch (err) {
    next(err)
  }
})
router.post('/:id', async (req, res, next) => {
  const id = req.body.id * 1;
  try {
    const product = await Product.update(req.body, { where: { id: id } });
    res.json(product);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.update(req.body, { where: { id: id }});
    res.sendStatus(201);
  }
  catch (err){
    next(err);
  }

})