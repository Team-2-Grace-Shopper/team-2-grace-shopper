const {
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  ENUM 
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
