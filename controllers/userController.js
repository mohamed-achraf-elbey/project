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
    
    res.render("index", { result: result.customerInfo });

  }).catch((err) => {
    console.log(err)
  })
}


const user_post = (req, res) => { //for add customer we use push // sma njibo id ta3 admin w mino n9dro ndiro nzido customor 
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);


  AuthUser.updateOne({ _id: decoded.id }, { $push: { customerInfo:{
    First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Country: req.body.Country,
            Email: req.body.Email,
            Telephone: req.body.Telephone,
            Age: req.body.Age,
            Gender: req.body.Gender,
  } } })
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
      
    })
    .catch((err) => {
      console.log(err);
    });
};


//************************************ */

const user_view_get = (req, res) => {
  // result ==> object
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  AuthUser.findOne({ _id: decoded.id , "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObject = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
     
    
      res.render("user/view", { user: clickedObject});
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
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  AuthUser.findOne({_id: decoded.id , "customerInfo._id": req.params.id })
  .then((result) => {
    const clickedObject = result.customerInfo.find((item) => {
      return item._id == req.params.id;
    });
    if (!clickedObject) {
      return res.status(404).send("User not found");
    }
    res.render("user/edit", { user: clickedObject });
  }).catch((err) => {
    console.error(err);
    res.status(500).send("serveur error");
  })

}

const user_search_post = (req, res) => {
  
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const keyword = req.body.name.trim();
  const regex = new RegExp(keyword, "i");

  // نجيب غير الـ admin لي راهو لوجي
  AuthUser.findOne({ _id: decoded.id })
    .then(user => {
      if (!user) {
        return res.status(404).send("Admin not found");
      }

      // نفلتري العملاء ديالو فقط
      const matched = user.customerInfo.filter(c =>
        regex.test(c.First_Name) ||
        regex.test(c.Last_Name) ||
        regex.test(c.Country)
      );

      res.render("user/search", { result: matched });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error searching user");
    });
};


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

  const user_put = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  
      const result = await AuthUser.updateOne(
        { _id: decoded.id , "customerInfo._id": req.params.id },
        {
          $set: {
            "customerInfo.$.First_Name": req.body.First_Name,
            "customerInfo.$.Last_Name": req.body.Last_Name,
            "customerInfo.$.Country": req.body.Country,
            "customerInfo.$.Email": req.body.Email,
            "customerInfo.$.Telephone": req.body.Telephone,
            "customerInfo.$.Age": req.body.Age,
            "customerInfo.$.Gender": req.body.Gender,
          },
        }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).send("User not found or not owned by this admin");
      }
  
      res.redirect("/home");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to update user");
    }
  };
  
const user_add_get = (req, res) => {
  res.render("user/add")
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