const {
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  ENUM,
  NOW
} = require('sequelize');
const db = require('../db');

const Order = db.define('order',{
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    initialAutoIncrement: 1000,
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
    defaultValue: NOW
  },
  status: {
    type: ENUM("open", "closed"),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  type: {
    type: ENUM("cart", "order"),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  shipToName: {
    type: STRING,
    required: false,
    unique: false, 
  },
  shipToAddress: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToCity: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToState: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipToZip: {
    type: STRING,
    required: false,
    unique: false,
  },
  billToName: {
    type: STRING,
    required: false,
    unique: false, 
  },
  billToAddress: {
    type: STRING,
    required: false,
    unique: false,
  },
  billToCity: {
    type: STRING,
    required: false,
    unique: false,
  },
  billToState: {
    type: STRING,
    required: false,
    unique: false,
  },
  billToZip: {
    type: STRING,
    required: false,
    unique: false,
  },
  trackingNumber: {
    type: STRING,
    required: false,
    unique: false,
  },
  email: {
    type: STRING,
    required: false,
    unique: false,
  },
  shipDate: {
    type: DATE,
    required: false,
    unique: false,
  },
  shipMethod: {
    type: ENUM("Standard", "2 day", "Overnight"),
    required: false,
    unique: false,
  },
  paymentMethod: {
    type: ENUM("Credit card", "Paypal", "Venmo"),
    required: false,
    unique: false,
  },
})

const Orderline = db.define('orderlines',{
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

module.exports = { Order, Orderline };
