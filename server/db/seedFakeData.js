//const Sequelize = require('sequelize');
const faker = require('faker');
const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']
const Country = require('./models/Country')
const User = require('./models/User')
const Product = require('./models/Product')
const { Order, Orderline } = require('./models/Order')
const db = require('./db');

const seedFakeData = async (nbrProducts = 20, nbrUsers = 20, nbrOrders = 20, ) => {
  await db.sync({force: true});

  coffeeCountries.forEach(async (c, i) => {
    await Country.create({
      name: c,
      description: faker.lorem.paragraph(1),
      region: coffeeRegions[i]
    })
  });

  for (let i = 0; i < nbrProducts; i++){
    const x = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(1),
      price: (Math.random()*20).toFixed(2),
      inventory: Math.round((Math.random()*1000)),
      countryId: Math.ceil(Math.random()*coffeeCountries.length)
    })
    // console.log(x)
  }

  for (let i = 0; i < nbrUsers; i++){
    const x = await User.create({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      userName: faker.internet.email()
    })
    // console.log(x)
  }
}

module.exports = seedFakeData;
