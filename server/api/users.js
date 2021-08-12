const router = require("express").Router();
const {
  models: { User, Order, Orderline, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "name", "address", "city", "state", "zip"],
      include: Order,
      // include: [
      //   { model: Order, include: [{ model: Orderline, include: [Product] }] },
      // ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id * 1;
  try {
    const user = await User.findAll({
      where: { id: id },
      attributes: ["id", "username", "name", "address", "city", "state", "zip"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  //  console.log('IN POST', req.body)
  console.log("#USERS:", await User.count());
  const id = req.body.id * 1;
  try {
    const user = await User.update(req.body, { where: { id: id } });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
