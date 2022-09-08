import MongoClass from "../../contenedores/MongoClass.js";
import { messagesSchema } from "../../models/MessagesSchema.js";
import { errorLogger } from "../../utils/logger.utils.js";

export class MongoDBMessages extends MongoClass {
	constructor() {
		super("mensajes", messagesSchema);
	}

	//agrega id autor al mensaje
	async addIdAuthor(message, idAuthor) {
		try {
			message.autor = idAuthor;
			//actualiza mensaje
			const messageUpdated = await this.collection.findByIdAndUpdate(
				message._id,
				{ autor: message.autor }
			);
			return messageUpdated;
		} catch (error) {
			errorLogger.error(JSON.stringify(error));
			throw new Error("error:", error);
		}
	}

	async getAll() {
		try {
			const all = await this.collection
				.find({})
				.populate("autor", { nombre: 1 }); //trae a la propiedad autor el esquema author, propiedad nombre
			return all;
		} catch (error) {
			errorLogger.error(JSON.stringify(error));
			throw new Error("error:", error);
		}
	}
}
