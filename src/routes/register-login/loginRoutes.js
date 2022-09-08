import { Router } from "express";
import passport from "../../middlewares/passport.js";

const loginRouter = Router();

loginRouter.get("/", async (req, res) => {
	//verifica si existe el usuario en session(registrado)
	res.sendFile(process.cwd() + "/src/public/login.html");
});

loginRouter.post(
	"/",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "/errorLogin",
	})
);

export default loginRouter;
