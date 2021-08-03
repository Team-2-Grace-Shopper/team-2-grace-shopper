const {
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4
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

module.exports = Product;
