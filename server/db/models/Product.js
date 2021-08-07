const {
  STRING,
  DECIMAL,
  INTEGER,
  ENUM,
  UUID, 
  UUIDV4,
  BOOLEAN
} = require('sequelize');
const db = require('../db');

const Product = db.define('product',{
  id: {
    type: UUID,
    primaryKey: true,
    required: true,
    allowNull: false,
    unique: true,
    defaultValue: UUIDV4,
  },
  type: {
    type: ENUM("coffee", "accessory"),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  category: {
    type: ENUM("mug", "grinder", "roast-light", "roast-medium", "roast-dark", "decaf", "flavored"),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
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
  imageUrl1: {
    type: STRING,
    defaultValue: '/images/sample_image.webp'
  },
  imageUrl2: {
    type: STRING,
    defaultValue: '/images/sample_image.webp'
  },
  imageUrl3: {
    type: STRING,
    defaultValue: '/images/sample_image.webp'
  },
  price: {
    type: DECIMAL(9,2),
    required: true,
  },
  salePrice: {
    type: DECIMAL(9,2),
    required: false,
  },
  weight: {
    type: DECIMAL(3),
    required: true,
  },
  inventory: {
    type: DECIMAL(6,0),
    required: true,
  },
  rating: {
    type: DECIMAL(2,1),
  },
  isFeatured: {
    type: BOOLEAN
  },
  onSale: {
    type: BOOLEAN
  }
})

module.exports = Product;
