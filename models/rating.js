'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const RatingSchema = new mongoose.Schema({
  toiletId: mongoose.ObjectId,
  rating: Number,
  toilet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toilet'
  }

}, { collection: 'ratings', timestamps: true });


RatingSchema.plugin(mongooseApiQuery)
RatingSchema.plugin(createdModified, { index: true })

const Rating = mongoose.model('Rating', RatingSchema)
module.exports = Rating