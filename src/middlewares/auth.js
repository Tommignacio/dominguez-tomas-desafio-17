const auth = async (req, res, next) => {
	if (req.isAuthenticated()) {
		//metodo de passport para saber si esta autenticado(registrado) el usaurio o no
		next();
	} else {
		res.redirect("/");
	}
};

export default auth;
