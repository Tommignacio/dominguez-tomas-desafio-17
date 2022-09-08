import { Router } from "express";
import passport from "../../middlewares/passport.js";

const registerRouter = Router();

registerRouter.get("/", async (req, res) => {
	res.redirect("/api/login");
});

registerRouter.post(
	"/",
	passport.authenticate("register", {
		successRedirect: "/",
		failureRedirect: "/errorRegister",
	})
);

export default registerRouter;
