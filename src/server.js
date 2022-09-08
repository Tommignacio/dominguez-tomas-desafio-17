import express from "express";
const app = express();
import { Server as ioServer } from "socket.io";
import http from "http";
import router from "./routes/indexRoutes.js";
import morgan from "morgan";
import { socketServer } from "./utils/socketServer.js";
import config from "./config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "./middlewares/passport.js";
import loggerInfo from "./middlewares/loggerInfo.js";
import { errorLogger } from "./utils/logger.utils.js";

//creo servidores
const httpServer = http.createServer(app); //creo servidor http
const io = new ioServer(httpServer); //creo servidor io Websocket

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(process.cwd() + "/src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(loggerInfo); //log con info de las peticiones en toda la app

//Session
app.use(
	session({
		store: MongoStore.create({ mongoUrl: config.mongoDB.URL("sessions-13") }), //guarda en mongo atlas las sessiones(base de datos con nombre session)
		secret: "clave-secreta",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60000, // se cerrará la sesion en 10mints.
		},
	})
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//middleware error
const ruteError = async function (req, res, next) {
	//mensaje de error al no existir la ruta
	errorLogger.error(
		`route '${req.originalUrl}' method '${req.method}' not implemented`
	);
	return res.status(404).json({
		error: -2,
		description: `route '${req.originalUrl}' method '${req.method}' not implemented`,
	});
};

//Motor plantillas
app.set("view engine", "ejs");
app.set("views", "src/public/views");

//Rutas
app.use("/", router);
app.use("/*", ruteError);

//socket
socketServer(io);

//empezando servidor
const PORT = 8080;
try {
	httpServer.listen(PORT, () => {
		//conecta a DB mongo atlas (base de datos ecommerce)
		mongoose
			.connect(config.mongoDB.URL("ecommerce-13"), config.mongoDB.options)
			.then(() => {
				console.log(`servidor escuchando en el puerto ${PORT}`);
			});
	});
} catch (error) {
	console.log(`error en el puerto ${PORT}`);
}
