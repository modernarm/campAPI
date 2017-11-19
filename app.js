let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/campgrounds", function (req, res) {
    let data = [{
        name: "Normal camp",
        images: "http://www.goodtogocamping.com/wp-content/uploads/2011/06/DSC_0276.jpg"
    }, {
        name: "Easy camp",
        images: "https://media-cdn.tripadvisor.com/media/photo-o/0f/48/8a/77/hintok-river-camp.jpg"
    }]

    console.log(data);
    res.render("campgrounds", {
        data: data
    });

});

app.listen(8181, function () {
    console.log("App started");
});