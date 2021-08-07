const router = require('express').Router()
module.exports = router
const { models: { Product, Country }} = require('../db')

/* before Shanntal's edit
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
*/

//Shanntal's edit
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