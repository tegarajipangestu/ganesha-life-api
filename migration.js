var seeder = require('mongoose-seed');
var dotenv = require('dotenv').config();

// Connect to MongoDB via Mongoose 
seeder.connect(process.env.MONGODB_DEV, function() {
	var data = [
		{ 
			model: "Category",
			documents: [
				{
			    name: "highlight",
			    description: "Semua yang hits ada disini",			
				}
			]
		}
	];		
	// Load Mongoose models 
	seeder.loadModels([
		'app/model/category.js',
	]);
	seeder.clearModels(['Category'], function() {
 		seeder.populateModels(data);
	 	console.log(data);
	});
	process.exit();
});
 
// Data array containing seed data - documents organized by Model 
