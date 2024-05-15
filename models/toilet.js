'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const ToiletSchema = new mongoose.Schema({
  // _id: mongoose.ObjectId,
  title: String,
  gender: String,
  imageDirectory: String,
}, { collection: 'toilets' });


ToiletSchema.plugin(mongooseApiQuery)
ToiletSchema.plugin(createdModified, { index: true })

const Toilet = mongoose.model('Toilet', ToiletSchema)
module.exports = Toilet