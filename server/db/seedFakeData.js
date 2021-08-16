//const Sequelize = require('sequelize');
const faker = require('faker');
const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']
const Country = require('./models/Country')
const User = require('./models/User')
const Product = require('./models/Product')
const { Order, Orderline } = require('./models/Order')
const db = require('./db');

const seedFakeData = async (nbrProducts = 100, nbrUsers = 50, nbrOrders = 200) => {
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
    const listPrice = (Math.random()*20).toFixed(2);
    const type = Math.random() < .35 ? 'accessory' : 'coffee';
    let category;
    if (type === 'accessory'){
      category = Math.random() < .5 ? 'mug' : 'grinder'
    } else {
      const rand = Math.random();
      switch (true){
        case rand < .17:
          category = 'roast-light';
          break;
        case rand < .34:
          category = 'roast-medium';
          break;
        case rand < .51:
          category = 'roast-dark';
          break;
        case rand < .68:
          category = 'decaf';
          break;
        case rand < .85:
          category = 'organic';
          break;
        default:
          category = 'flavored';
      }
    }
    const x = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(1),
      price: listPrice,
      salePrice: (listPrice*(Math.random())).toFixed(2),
      inventory: Math.round((Math.random()*1000)),
      countryId: Math.ceil(Math.random()*coffeeCountries.length),
      weight: Math.round((Math.random()*128)),
      isFeatured: Math.random() < .2 ? true : false,
      onSale: Math.random() < .3 ? true : false,
      rating: (Math.random()*2+3).toFixed(1),
      type: type,
      category: category,

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
      password: '123',
      isAdmin: Math.random() < .3 ? true : false,
    })
  }

//  create orders (half open, half closed)
  for (let i = 0; i < nbrOrders; i++){
    const status = Math.random() < .5 ? 'open' : 'closed';
    const x = await Order.create({
      orderDate: new Date() - (Math.random() * 10000000000),
      status: status,
      type: 'order',
      ...(status === 'closed' && { billToName: faker.name.firstName() + ' ' + faker.name.lastName(), 
                                   billToAddress: faker.address.streetAddress(),
                                   billToCity: faker.address.city(),
                                   billToState: faker.address.stateAbbr(),
                                   billToZip: faker.address.zipCode(),
                                   shipToName: faker.name.firstName() + ' ' + faker.name.lastName(), 
                                   shipToAddress: faker.address.streetAddress(),
                                   shipToCity: faker.address.city(),
                                   shipToState: faker.address.stateAbbr(),
                                   shipToZip: faker.address.zipCode(),
                                   email: faker.internet.email(),
                                   trackingNumber: 'EV938507560CN',
                                   shipDate: new Date() - (Math.random() * 10000000000)
                                  }),
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

  //    create a cart for half the users
  for (let i = 0; i < (nbrUsers / 2); i++){
    const x = await Order.create({
      orderDate: new Date() - (Math.random() * 10000000000),
      status: 'open',
      type: 'cart',
      userId: i+1,
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
