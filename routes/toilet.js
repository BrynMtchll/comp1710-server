const Toilet = require('../models/toilet');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

module.exports = function(server) {
	/**
	 * Read
	 */
  server.post('/toilet', (req, res, next) => {

    let data = JSON.parse(req.body)
		// let id = new mongoose.Types.ObjectId();
		

		const toilet = new Toilet({
			title: data.title,
			gender: data.gender,
			imageDirectory: data.imageDirectory
		})
    toilet.save()
      .then(user => {
        res.send(200, user)
        next()
      })
      .catch(err => {
        res.send(500, err)
    })
  });

	server.get('/toilet/:id', (req, res, next) => {
		const id = req.params.id

		Toilet.findById(id)
			.then(toilet => {
				if (!toilet) {
					res.send(404)
					next()
				}

				res.send(200, toilet)
				console.log(toilet)
				next()
			}).catch(err => {
				res.send(500, err)
			})
	})

	server.get('/toilets', (req, res, next) => {
		Toilet.find({})
			.then(toilets => {

				if (!toilets) {
					res.send(404)
					next()
				}

				res.send(200, toilets)
        console.log(toilets)
				next()
				
			})
			.catch(err => {
				res.send(500, err)
			})

	})

	server.del('/toilets/clear', (req, res, next) => {
		Toilet.deleteMany({})
			.then(() => {
				return Comment.deleteMany({})
				
			}).then(() => {
				res.send(200)
			}).catch(err => {
				res.send(500, err)
				console.log(err)
			})
	})

}