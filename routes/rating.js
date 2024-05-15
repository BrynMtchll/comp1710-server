const Rating = require('../models/rating');
const Toilet = require('../models/toilet')

module.exports = function(server) {

  server.post('/toilet/:id/rating', (req, res, next) => {
    const id = req.params.id;

    const rating = new Rating({
      rating: req.body.rating,
      toiletId: id
    })

    rating.save()
      .then(() => {
        console.log("rating saved")
          res.send(200, rating)
          next()
      })
      .catch ((err) => {
        res.send(500, err)
        console.log(err)
      })
  });

	server.get('/toilet/:id/ratings', (req, res, next) => {
    const id = req.params.id

    Rating.find({toiletId: id})
      .then(ratings => {
        console.log(ratings)
        res.send(200, ratings)
      })
        .catch(err => {
          res.send(500, err)
        console.log(err)
        })
    })

    server.del('/toilets/:id/ratings/clear', (req, res, next) => {
      Rating.deleteMany({})
          .then(() => {
        res.send(200)
      }).catch(err => {
        res.send(500, err)
        console.log(err)
      })
    })
}