const bodyParser = require("body-parser");
const express = require('express');
const date = require(__dirname + "/helper_functions/date.js");
const mongoose = require("mongoose");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const today = date.getDate();

/* ------------------------------------ Set up database ------------------------------------ */

mongoose.connect("mongodb+srv://itemadmin:mJUAhuf7j9VXkiq6@item-input-db.dhrfvdq.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'restricted'],
    required: true
  }
};

const itemSchema = {
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  lbh: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  checklist: {
    type: Boolean,
    required: true
  }
};

const Item = mongoose.model("Item", itemSchema);
const User = mongoose.model("User", userSchema);


const admin = new AdminJS({
  databases: [mongoose]
});

const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

/* ------------------------------------ APIs ------------------------------------ */

app.route("/")
  .get((req, res) => {
    res.redirect("/items");
  });

app.route("/items")
  .get((req, res) => {
    const etc = Item.find((err, foundItems) => {
        res.render("list", {
          itemsList: foundItems,
           day: today,
        });
      })
  })

  .post((req, res) => {
  const newItem = new Item({ //TODO: ADD SCHEMA FIELDS
      image: req.body.imgurl,
      name: req.body.name,
      title: req.body.title,
      description: req.body.desc,
      category: req.body.category,
      lbh: req.body.lbh,
      amount: req.body.amount,
      checklist: false
    })

    newItem.save((err, item) => {
      if (!err) { console.log("Successfully posted " + item.name + "!");}
        else { console.error(err);}
    })

    res.redirect("/items");
  });

app.route("/delete")

  .post((req, res) => {
    const checkedItemID = req.body.checkbox;
    Item.findByIdAndDelete(checkedItemID, (err, item) => {
      if (!err) { console.log("Successfully deleted \"" + item.name + "\"!");}
    })


    res.redirect("/items");

  });
/* ------------------------------------ Others ------------------------------------ */

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000.");
});
