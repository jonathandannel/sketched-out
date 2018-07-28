'use strict'

module.exports = function makeDataHelpers(db) {
  return {
    saveUsers: newUser => {
      return new Promise((resolve, reject) => {
        db.collection('users').insertOne(newUser, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      })
    },

    getUsers: user => {
      return new Promise((resolve, reject) => {
        db.collection('users').find(user).toArray((err, users) => {
          if (err){
            reject(err)
          } else {
            resolve(users)
          }
        })
      })

    }

  }
}