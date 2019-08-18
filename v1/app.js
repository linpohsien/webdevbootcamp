var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Los Angels", image:"https://pixabay.com/get/57e5dc4b4e55af14f6da8c7dda793f7f1636dfe2564c704c732e7cd49149c558_340.jpg"},
	{name: "New York", image:"https://pixabay.com/get/57e0d0434d5bb108f5d084609620367d1c3ed9e04e50744f74287bd29349c4_340.jpg"},
	{name: "San Antonio", image:"https://pixabay.com/get/55e4d2474857b108f5d084609620367d1c3ed9e04e50744f74287bd2934acd_340.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");   
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
	console.log("The YelpCamp Server has started");
});