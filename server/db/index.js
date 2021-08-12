//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const { Order, Orderline } = require("./models/Order");
const Country = require("./models/Country");
const seedFakeData = require("./seedFakeData");

Product.belongsTo(Country);
Country.hasMany(Product);
Order.belongsTo(User);
User.hasMany(Order);
Order.hasMany(Orderline);
Orderline.belongsTo(Order);
Product.hasMany(Orderline);

const seedDB = async () => {
  await db.sync({ force: true });
  await seedFakeData();
};

module.exports = {
  seedDB,
  db,
  models: {
    User,
    Product,
    Order,
    Orderline,
    Country,
  },
};
