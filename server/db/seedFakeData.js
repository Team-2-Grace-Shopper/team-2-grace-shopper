//const Sequelize = require('sequelize');
const faker = require('faker');
const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']
const Country = require('./models/Country')
const User = require('./models/User')
const Product = require('./models/Product')
const { Order, Orderline } = require('./models/Order')
const db = require('./db');

const { resolve } = require('path');
const { readdir } = require('fs').promises;

const getImages = async (dir) => {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = dirent.name;
//    const res = resolve(dir, dirent.name); // to get directory path plus name
    return dirent.isDirectory() ? getImages(res) : res;
    }));
  return Array.prototype.concat(...files);
  }

const seedFakeData = async (nbrProducts = 100, nbrUsers = 50, nbrOrders = 200) => {
  const productImages = await getImages('./public/images/products/coffee');
  const accyImages = await getImages('./public/images/products/accessories');
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
    const inventory = Math.random() < .1 ? 0 : Math.round((Math.random()*100));
    let category;
    let url1;
    let url2;
    let url3;
    if (type === 'accessory'){
      category = Math.random() < .5 ? 'mug' : 'grinder';
      url1 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];
      url2 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];
      url3 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];

    } else {
      url1 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
      url2 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
      url3 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
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
      inventory: inventory,
      countryId: Math.ceil(Math.random()*coffeeCountries.length),
      weight: Math.round((Math.random()*128)),
      isFeatured: Math.random() < .1 ? true : false,
      onSale: Math.random() < .25 ? true : false,
      rating: (Math.random()*2+3).toFixed(1),
      type: type,
      category: category,
      imageUrl1: url1,
      imageUrl2: url2,
      imageUrl3: url3,
    })
    products.push(x.id)
  }

  const userUsernames = [];
  // seed user "0" to be used for guest orders
  await User.create({id: 0, name: "Account for guest user's orders", username: 'GUEST', password:'Not!a$valid#account++', isAdmin: false})

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
      billToName: faker.name.firstName() + ' ' + faker.name.lastName(), 
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
      shipDate: new Date() - (Math.random() * 10000000000),
      shipMethod: 'Standard',
      paymentMethod: 'Credit card',
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
