var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v4", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
// 	{
// 		name: "Las Vegas",
// 		image: "https://pixabay.com/get/57e8d1454c5aa814f6da8c7dda793f7f1636dfe2564c704c732e72d2934ac758_340.jpg",
// 		description: "Casino"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Campground created");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");   
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
	    }
	});
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

// ==============
// Comment Routes
// ==============

app.get("/campgrounds/:id/comments/new", function(req, res){
	res.send("This will be the commennt form!");
});

app.listen(3000, function(){
	console.log("The YelpCamp Server has started");
});