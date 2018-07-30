'use strict'



module.exports = function makeDataHelpers(db) {
  return {
    saveUsers: newUser => {
      return new Promise((resolve, reject) => {
        db.collection('users').insertOne((err, newUser) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      })
    },
    
    getUsers: () => {
      return new Promise((resolve, reject) => {
        let users
        db.collection('users').find().toArray((err, users) => {
          if (err) {
            reject(err)
          } else {
            console.log(users)
            resolve(users)
          }
        })
      })
    }
  }
}