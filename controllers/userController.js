const User = require("../modelss/customersShema");
const AuthUser = require("../modelss/authShema");

var jwt = require('jsonwebtoken');


// 1- get nested objects inside an array 
// 2- add nested object inside an array 
// 3- delete nested object inside an array

// 4- update nested object inside an array 


const user_index_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);


  AuthUser.findOne({ _id: decoded.id }).then((result) => {
    // console.log(result)
    console.log("***********************************************")
    console.log(result)
    res.render("index", { result: result.customerInfo });

  }).catch((err) => {
    console.log(err)
  })
}


const user_post = (req, res) => { //for add customer we use push // sma njibo id ta3 admin w mino n9dro ndiro nzido customor 
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  console.log("========================================");
  console.log(req.body);

  AuthUser.updateOne({ _id: decoded.id }, { $push: { customerInfo: req.body } })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  AuthUser.updateOne(
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};


//************************************ */

const user_view_get = (req, res) => {
  // result ==> object
  AuthUser.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
      console.log(
        "============================================================"
      );
      console.log(clickedObject);

      res.render("user/view", { obj: clickedObject});
    })
    .catch((err) => {
      console.log(err);
    });
};
/*const user_view_get = (req, res) => {
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
}*/
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

/*const user_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id).then((result) => { //User.DeletOne({_id : req.parms.id})
    if (!result)
      console.log("user no defind");
    res.redirect("/");
  }).catch((err) => {
    console.log(err);
    res.status(500).send("user no deleted");
  })
} */

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

const user_add_get = (req, res) => {
  res.render("user/add", {})
}

module.exports = {
  user_index_get,
  user_view_get,
  user_edit_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
}