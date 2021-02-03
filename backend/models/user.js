const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    trim: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

// virtual fields are additional fields for a given model
// Their values can be set manually or automatically with defined functionality.
// Keep in mind: virtual properties don't get persisted in the database.
// They only exist logically and are not written to the document's collection.

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {

    this._password = password; // create temporary field called _password
    
    this.salt = uuid.v1(); // generate a timestamp
    
    this.hashedPassword = this.encryptPassword(password); // encrypt password
  })
  .get(function () {
    return this._password;
  });

// methods

userSchema.methods = {
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
  },
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
