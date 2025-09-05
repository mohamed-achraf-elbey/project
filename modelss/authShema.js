const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// SubSchema for each customer
const customerSchema = new Schema(
  {
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Email: { type: String, required: true },
    Telephone: { type: String, required: true },
    Age: { type: Number, required: true },
    Country: { type: String, required: true },
    Gender: { type: String, required: true },
  },
  { timestamps: true } 
);

// Main schema for Admin user
const authUserSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    customerInfo: [customerSchema], 
  },
  { timestamps: true } 
);

// Hash password before save
authUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const AuthUser = mongoose.model("User", authUserSchema);

module.exports = AuthUser;
