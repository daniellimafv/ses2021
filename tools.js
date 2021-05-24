/*
function makeOneTimeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 */

const v = require('validator')

module.exports = {
  validateGUID: function (id) {
    if (v.isUUID(id)) {
      return true
    } else {
      throw new Error('Invalide ID format')
    }
  },
  validateUserName: function (username) {
    if (v.isLength(username,1,8)) {
      return true
    } else {
      throw new Error('Invalide username size')
    }
  },
  validateOneTimeId: function (username) {
    if (v.isLength(username,12,12)) {
      return true
    } else {
      throw new Error('Invalide OneTimeId size')
    }
  },
  validateName: function (username) {
    if (v.isLength(username,100,100)) {
      return true
    } else {
      throw new Error('Invalide Name size')
    }
  }
};