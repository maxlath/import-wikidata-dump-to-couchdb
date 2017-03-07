module.exports = {
  db: {
    protocol: 'http',
    host: 'localhost',
    port: 5984,
    username: 'yourcouchdbusername',
    password: 'yourcouchdbpassword',
    dbName: 'authors',
    url: function () {
      return `${this.protocol}://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}`
    },
    urlWithoutCrendentials: function () {
      return `${this.protocol}://${this.host}:${this.port}/${this.dbName}`
    }
  },
  // Possible options: pass, update, exit
  onConflict: 'update'
}
