//const Sequelize = require('sequelize');
const faker = require('faker');
const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']
const Country = require('./models/Country')
const User = require('./models/User')
const Product = require('./models/Product')
const { Order, Orderline } = require('./models/Order')
const db = require('./db');

const seedFakeData = async (nbrProducts = 20, nbrUsers = 20, nbrOrders = 20) => {
  await db.sync({force: true});

  coffeeCountries.forEach(async (country, i) => {
    await Country.create({
      name: country,
      description: faker.lorem.paragraph(1),
      region: coffeeRegions[i]
    })
  });

  const products = [];
  for (let i = 0; i < nbrProducts; i++){
    const x = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(1),
      price: (Math.random()*20).toFixed(2),
      inventory: Math.round((Math.random()*1000)),
      countryId: Math.ceil(Math.random()*coffeeCountries.length)
    })
    products.push(x.id)
  }

  const userUsernames = [];
  for (let i = 0; i < nbrUsers; i++){
    const username = faker.internet.email();
    userUsernames.push(username);
    const x = await User.create({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      username: username,
      password: '123'
    })
  }

  for (let i = 0; i < nbrOrders; i++){
    const x = await Order.create({
      orderDate: new Date() - (Math.random() * 10000000000),
      status: Math.random() < .5 ? 'open' : 'closed',
      type: Math.random() < .5 ? 'cart' : 'order',
//      userUsername: userUsernames[Math.floor(Math.random()*nbrUsers)]
      userId: Math.ceil(Math.random()*nbrUsers),
    })
    const nbrLines = Math.ceil(Math.random() * 3)
    for (let j = 0; j < nbrLines; j++){
      await Orderline.create({
        lineNbr: j+1,
        quantity: Math.ceil(Math.random()*10),
        price: (Math.random()*20).toFixed(2),
        orderId: x.id,
        productId: products[Math.floor(Math.random()*nbrProducts)]
      })
    }
  }
}

module.exports = seedFakeData;
