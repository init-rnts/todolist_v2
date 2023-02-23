//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemsSchema = new mongoose.Schema({name: String});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({name: "Welcome to your todolist!"});
const item2 = new Item({name: "Hit + button to add a new item."});
const item3 = new Item({name: "<-- Hit this to delete the item."});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved to todolist.")
        }
      });
      res.redirect("/");
    } else {
      if (err) {
        console.log(err);
      } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    Item.create({name: itemName});
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {

  Item.findByIdAndDelete(req.body.checkbox, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted.");
    }
  });
  res.redirect("/");
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
