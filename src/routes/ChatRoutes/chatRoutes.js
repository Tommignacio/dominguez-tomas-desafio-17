import { Router } from "express";
import auth from "../../middlewares/auth.js";

const chatsRouter = Router();

chatsRouter.get("/", auth, async (req, res) => {
	//auth verifica si existe el usuario en session(registrado)
	const user = await req.user;
	res.render("chats", { user: user.firstname });
});

export default chatsRouter;
