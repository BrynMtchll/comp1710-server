const Comment = require('../models/comment');
const Toilet = require('../models/toilet')

module.exports = function(server) {

  server.post('/toilet/:id/comment', (req, res, next) => {
    const id = req.params.id;

    const comment = new Comment({
      text: req.body.text,
      toiletId: id
    })

    comment.save()
      .then(() => {
        console.log("comment saved")
          res.send(200, comment)
          next()
      })
      .catch ((err) => {
        res.send(500, err)
        console.log(err)
      })
  });

	server.get('/toilet/:id/comments', (req, res, next) => {
    const id = req.params.id

    Comment.find({toiletId: id})
      .then(comments => {
        console.log(comments)
        res.send(200, comments)
      })
        .catch(err => {
          res.send(500, err)
        console.log(err)
        })
    })

    server.del('/toilet/:id/comments/clear', (req, res, next) => {
      Comment.deleteMany({})
          .then(() => {
        res.send(200)
      }).catch(err => {
        res.send(500, err)
        console.log(err)
      })
    })

	// /**
	//  * Update
	//  */
	// server.put('/users/:userId', (req, res, next) => {

	// 	let data = req.body || {},
	// 		opts = {
  //               new: true
	// 		}

	// 	User.findByIdAndUpdate({ _id: req.params.userId }, data, opts)
	// 		.then(user => {

	// 			if (!user) {
	// 				res.send(404)
	// 				next()
	// 			}

	// 			res.send(200, user)
	// 			next()

	// 		})
	// 		.catch(err => {
	// 			res.send(500, err)
	// 		})

	// })

	// /**
	//  * Delete
	//  */
	// server.del('/users/:userId', (req, res, next) => {

	// 	const userId = req.params.userId

	// 	User.findOneAndRemove({ _id: userId })
	// 		.then((user) => {

	// 			if (!user) {
	// 				res.send(404)
	// 				next()
	// 			}

	// 			// remove associated todos to avoid orphaned data
	// 			Todo.deleteMany({ _id: userId })
	// 				.then(() => {
	// 					res.send(204)
	// 					next()
	// 				})
	// 				.catch(err => {
	// 					res.send(500, err)
	// 				})
	// 		})
	// 		.catch(err => {
	// 			res.send(500, err)
	// 		})

	// })

}