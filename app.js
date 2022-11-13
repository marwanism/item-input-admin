// const bodyParser = require("body-parser");
// const express = require('express');
// const bcrypt = require('bcrypt');
// const date = require(__dirname + "/helper_functions/date.js");
// const mongoose = require("mongoose");
// const AdminJS = require('adminjs');
// const AdminJSExpress = require('@adminjs/express');
// const AdminJSMongoose = require('@adminjs/mongoose');
// const comp = require('./components.js');
import bodyParser from "body-parser";
import express from 'express';
import bcrypt from 'bcrypt';
//import date from_"helper_functions/date.js";
import mongoose from "mongoose";
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
//const comp = require('./components.js';
//import { Components } from './components.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const app = express();

app.use(express.static("public"));
//app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//const today = date.getDate();

/* ------------------------------------ Set up database ------------------------------------ */

mongoose.connect("mongodb+srv://itemadmin:mJUAhuf7j9VXkiq6@item-input-db.dhrfvdq.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
  email: {
    type: String,
    required: true
  },
  encryptedPassword: {
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
    required: false
  }
};

const Item = mongoose.model("Item", itemSchema);
const User = mongoose.model("User", userSchema);


const admin = new AdminJS({
  databases: [mongoose],
  resources: [{
    resource: User,
    options: {
      properties: {
        encryptedPassword: {
          isVisible: false,
        },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                password: undefined,
              }
            }
            return request
          },
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
        edit: {
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
        delete: {
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
        list: {
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
      }
    }
  },
  {
  resource: Item,
    options: {
      actions: {
        edit: {
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
        delete: {
          isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        },
      },
      properties: {
        image: {
          components: {
            edit: AdminJS.bundle("/workspaces/item-input-admin/my-input.jsx"), // this is our custom component
          },
        },
      },
    }
  }],
  rootPath: '/admin',
  branding: {
    companyName: 'Item Input Dashboard',
  },
});

//AdminJS.watch();

// Build and use a router which will handle all AdminJS routes
//const adminRouter = AdminJSExpress.buildRouter(admin);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      console.log(user.email);
      var mat;
      const matched = bcrypt.compareSync(password, user.encryptedPassword); /*, (err, res) => {
          if(err) {
              console.log('Comparison error: ', err);
          } 
          if(res) {
            mat = true;
            return user;
        }
      }
      );*/
      console.log(matched);
      console.log(mat);
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie', // TODO: change cookiePassword
});
// app.use(admin.options.rootPath, adminRouter);
app.use(admin.options.rootPath, adminRouter);

app.use(bodyParser.json())

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
           //day: today,
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
