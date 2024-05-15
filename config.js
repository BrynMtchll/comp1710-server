'use strict'

module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri:  "mongodb+srv://brynly:GweAfcDkk3I2Dw4J@cluster0.guj4ga5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    },
}