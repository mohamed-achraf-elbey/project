const mongoose = require("mongoose") ; 
const Schema = mongoose.Schema ; 

const CustomersShema = new Schema ({
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Email: { type: String, required: true },
    Telephone: { type: String, required: true },
    Age : { type: Number, required: true },
    Country: { type: String, required: true },
    Gender: { type: String, required: true },
});
const User = mongoose.model("customer" , CustomersShema);
module.exports = User ;