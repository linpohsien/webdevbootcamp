// SCHEMA SETUP
var mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
    Comment    = require("./models/comment");

var data = [
	{
		name: "Tent1", 
	    image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732b7edc9644cc5a_340.jpg",
	    description: "Tent1"
	},
	{
		name: "Tent2", 
	    image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732b7edc9644cc5a_340.jpg",
	    description: "Tent2"
	},
	{
		name: "Tent3", 
	    image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c732b7dd7914dcd50_340.jpg",
	    description: "Tent3"
	}	
];

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
		    console.log(err);	
		}
		console.log("removed campgrounds!");
		// Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);	
				} else {
					console.log("added a campground!");
					// create a comment
					Comment.create(
					    {
						    text: "Good Tent1",
							author: "Bob"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comment.push(comment);
								campground.save();
								console.log("created a new comment!");
							}
						}
					);
				}
			});
		});		
	});
}

module.exports = seedDB;