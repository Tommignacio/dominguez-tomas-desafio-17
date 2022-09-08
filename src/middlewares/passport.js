import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { usersDao as apiUsers } from "../daos/index.js";
import formatUserForDB from "../utils/users.utils.js";

//crea codigo aleatorio
const salt = () => bcrypt.genSaltSync(10);
//encriptar contraseña
const createHash = (password) => bcrypt.hashSync(password, salt());
//compara conraseñas encriptadas
const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

//login
passport.use(
	"login",
	new LocalStrategy(
		{
			/**Por default espera un username y un password. Definirle esos campos segun mi form  (name = nombre ...)*/
			usernameField: "email",
		},
		async (email, password, done) => {
			try {
				const user = await apiUsers.getByEmail(email); //busca al usuario por su email
				console.log(user);
				//si no es valida la contraseña
				if (!isValidPassword(user, password)) {
					console.log("invalid user password");
					return done(null, false); //devuelve falso
				}
				console.log("User logged in successful!");
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

//registro
passport.use(
	"register",
	new LocalStrategy(
		{
			usernameField: "email",
			passReqToCallback: true, //recibe todos los datos del body(ademas de la contraseña y el correo)
		},
		async (req, email, password, done) => {
			try {
				const userExist = await apiUsers.emailRegisterExist(email); //busca al usuario por su email
				// console.log(userExist);
				if (!userExist) {
					//creo el usuario registrado
					const userObject = {
						firstname: req.body.firstname, //firstname esta en el form name=firstname
						lastname: req.body.lastname,
						birthdate: req.body.birthdate,
						email: email, //el username(email) que se guarda en passport
						password: createHash(password), //el password  que se guarda en passport y la encripto con la funcion createhash
					};
					//le doy formato del esquema de la DB al usario
					const newUser = formatUserForDB(userObject);
					//creo al usuario
					const user = await apiUsers.create(newUser);
					console.log("User registration successful!");
					return done(null, user);
				}
				console.log("this user has already existed" + userExist);
				return done(null, false);
			} catch (error) {
				console.log("error signing up ->", error);
				return done(error);
			}
		}
	)
);

// Serializacion :cuando agrega usuario a la sesion
passport.serializeUser((user, done) => {
	console.log("Inside serializer");
	done(null, user._id); //le pasamos el id del usaurio de mongo
});

// Deserializacion :cuando vamos a obtener el usuario de la sesion
passport.deserializeUser(async (id, done) => {
	//recibe el id del usario en la serielizacion
	console.log("Inside deserializer");
	const user = await apiUsers.getOne(id); //busca el id en la BD
	done(null, user);
});

export default passport;
