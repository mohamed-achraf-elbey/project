const User = require("../modelss/customersShema");
const AuthUser = require("../modelss/authShema");

const user_index_get = (req, res) => {
    User.find().then((result) => {
      // console.log(result)
      res.render("index", { result })
  
    }).catch((err) => {
      console.log(err)
    })
  }

  const user_view_get = (req, res) => {
    User.findById(req.params.id)
      .then((result) => {
        if (!result) {
          return res.status(404).send("User not found");
        }
        // Render and pass user data
        res.render("user/view", { user: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Server Error");
      });
  }
const user_edit_get = (req, res) => {
    User.findById(req.params.id).then((result) => {
      if (!result) {
        return res.status(404).send("User not found");
      }
      res.render("user/edit", { user: result });
    }).catch((err) => {
      console.error(err);
      res.status(500).send("serveur error");
    })
  
  }

  const user_search_post = (req, res) => {
    const keyword = req.body.name.trim(); 
  
    User.find({
      $or: [
        { First_Name: { $regex: keyword, $options: "i" } }, 
        { Last_Name: { $regex: keyword, $options: "i" } },  
        { Country: { $regex: keyword, $options: "i" } }    
      ]
    })
      .then(result => {
        //console.log(result);
          res.render("user/search", { result }); 
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error searching user");
      });
  }

  const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id).then((result) => { //User.DeletOne({_id : req.parms.id})
      if (!result)
        console.log("user no defind");
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.status(500).send("user no deleted");
    })
  }

const user_put = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body) // or findByIdAndUpdate(req.params.id,req.body)
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).send("User not found");
        }
        res.redirect("/home");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Failed to update user");
      });
  }

  const user_add_get =(req, res) => {
    res.render("user/add", {})
  }
  const usr_post = (req, res) => {
    //console.log(req.body);
    //const user = new User();
    User.create(req.body).then(result => {
      res.redirect("/home ");
    }).catch(err => {
      console.log(err);
      res.status(500).send("Error saving user");
    })
  
  }

  module.exports = {user_index_get,
    user_view_get,
    user_edit_get,
    user_search_post,
    user_delete,
    user_put,
    user_add_get,
    usr_post}