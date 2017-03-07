module.exports = {
  db: {
    protocol: 'http',
    host: 'localhost',
    port: 5984,
    username: 'yourcouchdbusername',
    password: 'yourcouchdbpassword',
    dbName: 'authors',
    dbUrl: function () {
     return `${this.protocol}://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}`
    }
  }
}
