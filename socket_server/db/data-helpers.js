'use strict'



module.exports = function makeDataHelpers(db) {
  return {
    saveUsers: newUser => {
      return new Promise((resolve, reject) => {
        db.collection('users').insertOne(newUser, (err, newUser) => {
          if (err) {
            reject(err)
          } else {
            resolve('done')
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
            resolve(users)
          }
        })
      })
    }
  }
}