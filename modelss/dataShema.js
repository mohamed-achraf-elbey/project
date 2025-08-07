const mongoos = require("mongoose") ; 
const Shema = mongoos.Schema ; 

const UserName = new Shema ({
    username: String 
});
const MyData = mongoos.model("MyDataa" , UserName);
module.exports = MyData ;