const Sequelize = require('sequelize');
const faker = require('faker');
const {
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4
} = Sequelize;

const coffeeCountries=['Brazil','Vietnam','Colombia','Indonesia','Ethopia','Honduras','India','Mexico','Peru']
const coffeeRegions=['South America','Asia','South America','Asia','Africa','Central America','Asia','Central America','Central America']

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:FSA123@localhost/team2coffee',
  { logging: false });

  const Country = db.define('country',{
    name: {
      type: STRING,
      required: true,
      allowNull: false,
      unique: true
    },
    description: {
      type: STRING(1000),
      allowNull: false,
      required: true,
      unique: false,
      validate: { notEmpty: true },
    },
    imageUrl: {
      type: STRING,
      defaultValue: '/def_campus_image.jpg'
    },
    region: {
      type: STRING,
      required: true,
    },
  })
  

const Product = db.define('product',{
  id: {
    type: UUID,
    primaryKey: true,
    required: true,
    allowNull: false,
    unique: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: false, // true
  },
  description: {
    type: STRING(1000),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  imageUrl: {
    type: STRING,
    defaultValue: '/def_campus_image.jpg'
  },
  price: {
    type: DECIMAL(9,2),
    required: true,
  },
  inventory: {
    type: DECIMAL(6,0),
    required: true,
  },
})

const User = db.define('user',{
  id: {
    type: STRING,
    primaryKey: true,
    required: true,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  name: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: false, 
    validate: { notEmpty: true },
  },
  address: {
    type: STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  city: {
    type: STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  state: {
    type: STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  zip: {
    type: STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
})


const Order = db.define('order',{
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    required: true,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  orderDate: {
    type: DATE,
    required: true,
    allowNull: false,
    unique: false, 
  },
  status: {
    type: STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
}, {initialAutoIncrement: 1000})

const Orderlines = db.define('orderlines',{
  lineNbr: {
    type: INTEGER,
    required: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  quantity: {
    type: INTEGER,
    required: true,
    allowNull: false,
    unique: false, 
  },
  price: {
    type: DECIMAL(9,2),
    required: true,
    allowNull: false,
    unique: false, 
  },

})

// associations
Product.belongsTo(Country);
Country.hasMany(Product);
User.hasMany(Order);
Order.hasMany(Orderlines);
Orderlines.belongsTo(Order);
Product.hasMany(Orderlines);

const seedTestData = async (nbrProducts = 20, nbrUsers = 20, nbrOrders = 20, ) => {
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
      id: faker.internet.email()
    })
    // console.log(x)
  }
}

module.exports = { seedTestData };

seedTestData();