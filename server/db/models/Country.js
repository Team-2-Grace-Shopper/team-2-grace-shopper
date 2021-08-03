const { 
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4
} = require('sequelize');
const db = require('../db')

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

module.exports = Country ;