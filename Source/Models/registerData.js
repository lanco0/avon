const { Schema, model } = require("mongoose");

const register = Schema({
  guildID: String,
  userID: String,
  büyücüRegisterNumber: { type: Number, default: 0 },
  cadıRegisterNumber: { type: Number, default: 0 },
  endRegisterUserID: { type: String, default: "" },
  registerNames: { type: Array, default: [] },
  register: { type: Boolean, default: false },
  registerObject: { type: Object, default: "" },
});

module.exports = model("registerData", register);
