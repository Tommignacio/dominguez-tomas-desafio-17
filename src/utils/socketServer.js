//socket desde el servidor
import {
	authorsDao as apiAuthors,
	messagesDao as apiMessages,
} from "../daos/index.js";
import { normalizedMessages } from "../normalize/messages.js";

export const socketServer = (io) => {
	io.on("connection", async (socket) => {
		console.log("conection socket");
		//lee la DB mensajes
		const messages = await apiMessages.getAll();
		//normalizo mensajes
		const messagesNormalized = normalizedMessages(messages);
		//emite al front el usuario y mensaje de la DB normalizada
		socket.emit("DBdata:messages", messagesNormalized);
		//recibe los datos del mensaje con el usuario desde el front
		socket.on("chatData", async (data) => {
			//crea nuevo usuario y mensaje
			const authorCreated = await apiAuthors.create(data);
			const messageCreated = await apiMessages.create(data);
			// agrega id de usario al mensaje
			await apiMessages.addIdAuthor(messageCreated, authorCreated._id);
			//lee DBs actualizadas
			const authorsUpdated = await apiAuthors.getAll();
			const messagesUpdated = await apiMessages.getAll();
			//normalizo mensajes
			const messagesNormalized = normalizedMessages(messagesUpdated);
			//emite al front las BDs
			socket.emit("DBdata:messages", messagesNormalized);
		});
	});
};
