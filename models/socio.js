var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:30000/club');

var socioSchema = new  Schema({
	id_socio: Number,
	nrosocio:  Number,
	nombre:  String, 
	apelllido: String,
	dni: Number,
	deportes : Array,
	cuotas : Array
});

var club = mongoose.model('club', socioSchema);
module.exports.club = club;
//r user = mongoose.model('user', {email: String, password: String});
