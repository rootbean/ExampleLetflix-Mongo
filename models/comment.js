'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
	show: String,
	user: String,
	description: String,
	date: {
		type: Date,
		default: Date.now()
	},
	active: {
		type: Boolean,
		default: true
	}
})

module.exports = mongoose.model('Comment', CommentSchema)
