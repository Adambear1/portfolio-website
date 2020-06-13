var express = require('express')
var app = express();
var PORT = process.env.PORT || 8080;
var path = require("path");
var helmet = require('helmet')

app.use(helmet())

// Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/about.html"));
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});