'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const CommentSchema = new mongoose.Schema({
  toiletId: mongoose.ObjectId,
  text: {
    type: String,
    required: true,
  },
  toilet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Toilet'
  }

}, { collection: 'comments', timestamps: true });


CommentSchema.plugin(mongooseApiQuery)
CommentSchema.plugin(createdModified, { index: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment