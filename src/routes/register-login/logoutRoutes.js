import { Router } from "express";
import auth from "../../middlewares/auth.js";

const logoutRouter = Router();

//logout ruta
logoutRouter.get("/", auth, async (req, res, next) => {
	//auth verifica si existe el usuario en passport session(registrado)
	const user = await req.user;
	console.log(user);
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.render("logout", { user: user.firstname });
	});
});

export default logoutRouter;

// app.post('/logout', function(req, res, next) {
// 	req.logout(function(err) {
// 	  if (err) { return next(err); }
// 	  res.redirect('/');
// 	});
//   });
