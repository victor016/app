var express = require("express");
var bodyParser = require("body-parser");
var methodOverrider = require("method-override");
var user = require("./models/user").user;
var cookieSession = require("cookie-session");
var router_app= require("./routes_app");
var session_middlware = require("./middlewares/session");
var app = express();



//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:30000/club');

//var user = mongoose.model('user', {email: String, password: String});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
	         name :"session",
	         keys:["llave-1", "llave-2"]
         }));
//app.use(session({
//	secret: "123wer324wg54etretg",
//	resave: false,
//	seveUninitialized: false
//}));
app.set("view engine","jade");

//routing
app.get("/",function (req, res) {
	console.log(req.session.user_id);
	res.render("index");
});

app.get("/singup",function (req, res) {
	user.find(function (err,doc) {
		console.log(doc);
		res.render("singup");
	});
	
});

app.get("/login",function (req, res) {
	user.find(function (err,doc) {
		console.log(doc);
		res.render("login");
	});
	
});

app.post("/users",function (req, res) {
	var usuario = new user({
						name: req.body.name,
						username: req.body.username,
						password: req.body.password,
						age: req.body.age,
						email: req.body.email,
						date_of_birth: req.body.date_of_birth
					});
	//usuario.save(function() {
//		res.send("Guardamos tus datos")/
	//});
	usuario.save().then(function (us) {
		res.send("Guardamos tus datos");
	},function (err) {
		res.send("No se pudo Guardamos tus datos" + err);
	});
	
});

app.post("/sessions",function (req, res) {
   user.findOne({email: req.body.email , password: req.body.password},
   	         function (err,user) {
   	    req.session.user_id = user._id;
   		res.send("Login Correcto");
   })
});

app.post("/",function(req, res){
	res.render("form");
});

app.use("/app",session_middlware);
app.use("/app",router_app);
app.listen(8080);