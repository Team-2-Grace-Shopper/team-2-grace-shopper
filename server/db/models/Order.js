const {
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4
} = require('sequelize');
const db = require('../db');

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
