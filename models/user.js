var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:30000/club');

var userSchema = new  Schema({
	name: String,
	username: {type : String, require: true},
	password: {type : String, require: true, minlength:[8,"passsword muy corto"]},
	age: {type : Number,min:[12, "la edad no puede ser menor que 12"], max:[100,"La edad no puede ser mayor a 100"] },
	email: {type : String, required: "El correo es obligatorio"},
	date_of_birth: Date
});
userSchema.virtual("password_confirmation").get(function () {
	return this.pass_c;
}).set(function (password) {
	this.pass_c = password;
});

var User = mongoose.model('user', userSchema);
module.exports.user = User;

//r user = mongoose.model('user', {email: String, password: String});