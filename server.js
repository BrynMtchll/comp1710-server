const { MongoClient, ServerApiVersion } = require('mongodb');

const config        = require('./config'),
      restify       = require('restify'),
      bunyan        = require('bunyan'),
      winston       = require('winston'),
      bunyanWinston = require('bunyan-winston-adapter'),
      mongoose      = require('mongoose'),
      errors        = require('restify-errors'),
      corsMiddleware = require('restify-cors-middleware2');

// const uri = "mongodb+srv://brynly:GweAfcDkk3I2Dw4J@cluster0.guj4ga5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


/**
 * Logging
 */
global.log = new winston.createLogger({
  transports: [
      new winston.transports.Console(),
  ]
})

/**
* Initialize Server
*/
global.server = restify.createServer({
  name    : "ANU Toilets API",
  log     : bunyanWinston.createAdapter(log),
})

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())


/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
  log.error(err.stack)
  res.send(err)
});


server.listen(config.port, function() {

  mongoose.connection.on('error', function(err) {
      log.error('Mongoose default connection error: ' + err)
      process.exit(1)
  })

  mongoose.connection.on('open', function(err) {

      if (err) {
          log.error('Mongoose default connection error: ' + err)
          process.exit(1)
      }

      log.info(
          `${server.name} ready to accept connections on port ${config.port}.`
      )

      require('./routes/toilet')(server)
      require('./routes/comment')(server)
      require('./routes/rating')(server)



  })

  global.db = mongoose.connect(config.db.uri)
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err));

})