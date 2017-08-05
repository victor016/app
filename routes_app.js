var express = require("express");
var club = require("./models/socio").club;
var router= express.Router();

router.get("/",function (req, res) {
	res.render("app/home");
});

router.get("/socio/new",function (req, res) {
	res.render("app/socio/new");
});

router.get("/socio/:id/edit",function (req, res) {
	club.findById(req.params.id,function(err, socio) {
			res.render("app/socio/edit",{socio : socio});
		});
});


router.route("/socio/:id")
	.get(function(req,res) {
		club.findById(req.params.id,function(err, socio) {

		});
	})
	.put(function(req,res) {
		club.findById(req.params.id,function(err, socio) {
			
			socio.id_socio = req.body.id_socio;
			socio.nrosocio = req.body.numsocio;
	        socio.nombre = req.body.nombresocio;
	        socio.apellido = req.body.apellidosocio;
	        socio.dni = req.body.DNI;
		
		});
	})
	.delete(function(req,res) {
		// body...
	});

router.route("/socio")
	.get(function(req,res) {
		club.find({},function(err, socio) {
			 	if (err) {
					console.log(err);
					res.redirect("/login");
				} else {
					 res.render("app/socio/Socios",{socios: socio});
				}
		 });
	})
	.post(function(req,res) {
		var data ={
			id_socio : req.body.id_socio,
			nrosocio: req.body.numsocio,
	        nombre: req.body.nombresocio,
	        apellido: req.body.apellidosocio,
	        dni: req.body.DNI
		}
		var socio = new club(data);
		socio.save(function (err) {
			if (!err) {
				res.send("Socio ingresado");
			} else {
				res.send(err);
			}
		});
	});
module.exports = router;