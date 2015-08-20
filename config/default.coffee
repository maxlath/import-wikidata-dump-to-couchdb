module.exports =
  db:
    protocol: 'http'
    host: 'localhost'
    port: 5984
    username: 'yourcouchdbusername'
    password: 'yourcouchdbpassword'
    dbName: 'authors'
    dbUrl: -> "#{@protocol}://#{@username}:#{@password}@#{@host}:#{@port}/#{@dbName}"
