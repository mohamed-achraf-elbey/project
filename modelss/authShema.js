const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const authUserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

authUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // ما يعاودش يشفر لو الباسوورد ما تبدلتش
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
const AuthUser = mongoose.model("User", authUserSchema);

module.exports = AuthUser;
