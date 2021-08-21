const faker = require('faker');
const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']
const Country = require('./models/Country')
const User = require('./models/User')
const Product = require('./models/Product')
const { Order, Orderline } = require('./models/Order')
const db = require('./db');

// const { resolve } = require('path');
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

// array with product names so we don't use Faker for them
const accessoryNames = [
    'Single Serve Espresso Maker',
    'Electric Milk Frother',
    'Toddy Cold Brew Coffee Maker',
    'Coffee Maker Bodum Black 8oz Cup',
    'Handheld Milk Frother Black',
    'Bodum Bistro',
    'Sand Infusions Kit',
    'Monaco Glass Removable Infuser 42oz',
    'Pour Over Kit',
    'Hario Brew Bottle',
    'Dripper with Coffee Filter',
    'Toddy Brew System',
    'New Orleans-Style Brewing Kit',
    'Original Grey Dripper',
    'Coffee Carafe Essential',
    'Chemex 3-Cup',
    'Chemex 6-Cup',
    'Bonavita Connoisseur Coffee Brewer',
    'Technivorm Select Moccamaster',
    'Aero Press',
    'Bodum Chambord 17oz French Press',
    'Hario Nel Drip Set',
    'Timbuk2 Weekender Kit',
    'Fellow Atmos Vacuum Canister',
    'Personal Oji',
    'Cold Brew Kit',
    'Ceramic Coffee Mill',
    'Encor Coffee Grinder',
    'Baratza Vario Grinder',
    'Fellow Ode Grinder',
    'Baratza Virtuoso Grinder',
    'Electric Kettle',
    'Prolex Mini Grinder II',
    'Takahiro Pour Over Kettle',
    'Stagg Stovetop Pour-Over Kettle',
    'Tsuki Usagi Jirushi Slim Pot'
    ];
    
const coffeeNames = [
  'Brooklyn Blend Coffee',
  'Classico Coffee',
  'Flatiron Blend Coffee',
  'Cold Brew Coffee',
  'Original Cold Brew',
  'Chocolate Cold Brew',
  'Horchata Cold Brew',
  'Hair Bender Coffee',
  'Holler Mountain Coffee',
  'Guatemala El Coffee',
  'Colombia Cantillo Coffee',
  'Ethiopia Mordecofe',
  'Indonesia Bies Penantan',
  'Honduras El Puente',
  'Rwanda Huye Mountain',
  'House Blend',
  'Indonesia Muhtar',
  'French Roast',
  'Trapper Creek Decaf',
  'Costa Rica Sumava Coffee',
  'August Roasters Blend',
  'Italian Roast Espresso',
  'Colombian Supremo',
  'Dark Brazil',
  'Breakfast Blend',
  'Dark Sumatra Mandheling',
  'Ethiopian Yirgacheffe',
  'Hazelnut Flavored Coffee',
  'Kenya AA',
  'Fiar Trade Dark Sumatra',
  'Grandfather Blend®',
  'Chocolate Raspberry Flavored',
  'Coconut Cream Pie Iced Coffee',
  'Organic Bali Blue Moon Coffee',
  'Black Knite Coffee Bean',
  'Costa Rican Tarrazu',
  'Organic Colombian',
  'Colombian Extra Supremo',
  'Tanzanian Peaberry',
  'Organic Haitian Blue',
  'Ethiopian Sidamo Swiss Decaf',
  'Organic Peruvian',
  'Honduran Marcala Coffee',
  'Mocha Java',
  'Indian Monsoon Malabar',
  'Sumatra Mandheling Roasted',
  'Tiger Nebular Roasted',
  'Nossa Senhora de Fatima',
  'Organic Java Taman Dadar',
  'Monsoon Water Process Decaf',
  'Colombian Primo Supremo',
  'Organic Timor',
  'Dark Ethiopian Yigacheffe Kochere',
  '100% Jamaica Blue Mountain',
  'Brazil Fazenda Santa Luzia',
  'Caffe Americano',
'Blonde Roast',
'Caffe Misto',
'Pike Place',
'Decaf Pike Place',
'Cappuccino',
'Expresso',
'Expresso con Panna',
'Flat White',
'Honey Almon Milk Flate White',
'Caffe Latte',
'Cinnamon Dolce Latte',
'Starbucks Reserve Latte',
'Starbucks Reserve Hazelnut Bianco Latte',
'Blond Vanilla Latte',
'Carmel Macchiato',
'Expresso Macchiato',
'Caffe Mocha',
'Starbucks Reserve Dark Chocolate Mocha',
'White Chocolate Mocha',
'Honey Almondmilk Cold Brew',
'Salted Caramel Cream Cold Brew',
'Starbucks Reserve Cold Brew',
'Starbucks Cold Brew',
'Vanilla Sweet Cream Cold Brew',
'Starbucks Cold Brew with Milk',
'Honey Almondmilk Nitro Cold Brew',
'Starbucks Reserve Nitro Cold Brew',
'Salted Caramel Cream Nitro Cold Brew',
'Nito Cold Brew',
'Vanilla Sweat Cream Nitro Cold Brew',
'Iced Caffe Americano',
'Iced Coffee',
'Iced Coffee with Milk',
'Iced Expresso',
'Iced Chocolate Almondmilk Shaken Expresso',
'Iced Shaken Expresso',
'Iced Flat Whte',
'Iced Honey Almondmilk Flat White',
'Starbucks Reserve Iced Latte',
'Starbucks Reserve Iced Hazelnut Bianco Latte',
'Iced Coffe Latte',
'Iced Cinnamon Dolce Latte',
'Iced Starbuck Blond Vanilla Latte',
'Iced Caramel Macchiato',
'Iced Coffee Mocha',
'Iced White Chocale Mocha',
'Starbucks Reserve Iced Dark Chocolate Mocha'
  ];
  
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
  let coffeeIdx = 0;
  let accyIdx = 0;
  for (let i = 0; i < nbrProducts; i++){
    const listPrice = (Math.random()*20).toFixed(2);
    const type = Math.random() < .35 ? 'accessory' : 'coffee';
    const inventory = Math.random() < .1 ? 0 : Math.round((Math.random()*100));
    let category;
    let url1;
    let url2;
    let url3;
    let name;
    if (type === 'accessory'){
      category = Math.random() < .5 ? 'mug' : 'grinder';
      url1 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];
      url2 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];
      url3 = '/images/products/accessories/' + accyImages[Math.floor(Math.random() * accyImages.length)];
      if (accyIdx > accessoryNames.length){
        accyIdx = 0;
      }
      name = accessoryNames[accyIdx];
      accyIdx += 1;
    } else {
      url1 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
      url2 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
      url3 = '/images/products/coffee/' + productImages[Math.floor(Math.random() * productImages.length)];
      if (coffeeIdx > coffeeNames.length){
        coffeeIdx = 0;
      }
      name = coffeeNames[coffeeIdx];
      coffeeIdx += 1;
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
      name: name,
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
  const user = await User.create({id: 0, name: "Account for guest user's orders", username: 'GUEST', password:'Not!a$valid#account++', isAdmin: false})
  db.query("update users set id=0");

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
      userId: Math.ceil(Math.random()*(nbrUsers-2) + 2),
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
  for (let i = 1; i < (nbrUsers / 2); i++){
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
