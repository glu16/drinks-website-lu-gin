// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

// CALL BACK FUNCTIONS
app.get("/", function (req, res) {
  let doc = fs.readFileSync("./app/html/main.html", "utf8");
  res.send(doc);
});

app.get("/main.html", function (req, res) {
  let doc = fs.readFileSync("./app/html/main.html", "utf8");
  res.send(doc);
});

app.get("/about.html", function (req, res) {
  let doc = fs.readFileSync("./app/html/about.html", "utf8");
  res.send(doc);
});

app.get("/table.html", function (req, res) {
  let doc = fs.readFileSync("./app/html/table.html", "utf8");
  res.send(doc);
});

app.get("/drinks", function (req, res) {
  let formatOfResponse = req.query["format"];

  if (formatOfResponse == "html") {
    // MIME type
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("./app/data/drinks.html", "utf8"));
  } else if (formatOfResponse == "json") {
    // MIME type
    res.setHeader("Content-Type", "application/json");
    res.send(fs.readFileSync("./app/data/drinks.js", "utf8"));
  } else {
    // Just send JSON message
    res.send({ status: "fail", msg: "Wrong format!" });
  }
});

// PAGE NOT FOUND ERROR
app.use(function (req, res, next) {
  res
    .status(404)
    .send(
      "<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>"
    );
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Assignment 5 listening on port " + port + "!");
});
