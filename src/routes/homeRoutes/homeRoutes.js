import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
	//verifica si existe el usuario en session(registrado)
	const user = await req.user;
	//console.log(user);
	// console.log(user);
	if (user) {
		return res.redirect("/api/chat");
	} else {
		return res.redirect("/api/login");
	}
});

// homeRouter.post("/", (req, res) => {
// 	const { name } = req.body;
// 	//crea session
// 	req.session.user = name;
// 	req.session.save((err) => {
// 		if (err) {
// 			console.log("error al iniciar session", err);
// 			res.redirect("/api/login");
// 		}
// 	});
// 	res.render("chats", { user: name });
// });

export default homeRouter;
