var user = require("../models/user").user;

module.exports = function(req,res,next){
	if (req.session.user_id) {
		 user.findById(req.session.user_id,function(err, user) {
			 	if (err) {
					console.log(err);
					res.redirect("/login");
				} else {
					res.locals = { Usuario: user};
					next();

				}
		 });
	}else{
		res.redirect("/login");
	}
}