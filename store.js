const express = require('express');
const app = express();
const mc = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
let db;

//Use body parser for form data
app.use(express.urlencoded({extended: true})); 
app.set("view engine", "pug");

//Serve static files from public (for the add page)
app.use(express.static("public"));

app.get("/products", listProducts);
app.post("/products", createNewProduct);

app.get("/products/:pid", readProduct);
app.post("/products/:pid", updateProduct);
app.delete("/products/:pid", deleteProduct);
app.put("/products/:pid", undoDelete);

function createNewProduct(req, res, next){
	let product = {};
	
	product.name = req.body.name;
	product.price = Number(req.body.price);
	product.stock = Number(req.body.stock);
	product.hidden = false;
	product.comments = "";
	
	db.collection("products").insertOne(product, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		let newID = result.insertedId;
		
		//Redirect to the view page for the new product
		res.redirect("http://localhost:3000/products/" + newID);
	});
}

function deleteProduct(req, res, next){ 
	
	let id = req.params.pid;
	let oid;
	console.log("id: " + id);
	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	
	db.collection("products").findOne({"_id": oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("That ID does not exist in the database.");
			return;
		}
		result.hidden = true;
		result.comments = req.body.comments;
				
		db.collection("products").replaceOne({"_id": oid}, result, function(err, result){
			if(err){
				res.status(500).send("Error saving to database.");
				return;
			}
		});
		
		console.log(result);
		res.status(200).send();
	});
}

function undoDelete(req, res, next){		
	let id = req.params.pid;
	let oid;
	console.log("id: " + id);
	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	
	db.collection("products").findOne({"_id": oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("That ID does not exist in the database.");
			return;
		}
		
		result.hidden = false;
		result.comments = "";
		
		db.collection("products").replaceOne({"_id": oid}, result, function(err, result){
			if(err){
				res.status(500).send("Error saving to database.");
				return;
			}
		});
		
		console.log(result);
		res.status(200).send();
	});
}

function updateProduct(req, res, next){
	let id = req.params.pid;	
	let oid;
	console.log("id: " + id);
	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	
	let product = {}
	
	product.name = req.body.name;
	product.price = Number(req.body.price);
	product.stock = Number(req.body.stock);
	product.comments = req.body.comments;
	product.hidden = req.body.hidden;
		
	db.collection("products").replaceOne({"_id": oid}, product, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		console.log(result);
		//Redirect to the view page for the new product
		res.redirect("http://localhost:3000/products/" + id);
	});
}

function listProducts(req, res, next){
	db.collection("products").find({}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).render("productlist", {products: result});
	});
}

function readProduct(req, res, next){
	let id = req.params.pid;	
	let oid;

	try{
		oid = new ObjectID(id);
	}catch{
		res.status(404).send("That ID does not exist.");
		return;
	}
	console.log("id: " + id);
	db.collection("products").findOne({"_id": oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("That ID does not exist in the database.");
			return;
		}
		res.status(200).render("product", {product: result});
	});
}

mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	db = client.db("mysite");
	app.listen(3000);
	console.log("Server listening on port 3000");
})
