'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  alias: { type: String, unique: true, lowercase: true},
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  registerDate: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true},
  showsFavorites: [Number]
})

module.exports = mongoose.model('User', UserSchema)
