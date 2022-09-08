/*                         ****FACTORY****
Elige cual daos importar dependiendo la base de datos a utilizar
*/
import dotenv from "dotenv";

dotenv.config();
let productsDao, cartsDao, authorsDao, messagesDao, usersDao;

switch (process.env.DB_NAME) {
	case "mongoDB":
		import("./products/MongoDBProducts.js").then(({ MongoDBProducts }) => {
			productsDao = new MongoDBProducts();
		});
		import("./carts/MongoDBCarts.js").then(({ MongoDBCarts }) => {
			cartsDao = new MongoDBCarts();
		});
		import("./chats/mongoDBAuthors.js").then(({ MongoDBAuthors }) => {
			authorsDao = new MongoDBAuthors();
		});
		import("./chats/mongoDBMessages.js").then(({ MongoDBMessages }) => {
			messagesDao = new MongoDBMessages();
		});
		import("./accounts/Users.dao.js").then(({ MongoDBUsers }) => {
			usersDao = new MongoDBUsers();
		});
		break;
	default:
		throw new Error("It's in default (No DB provided)");
}

export { productsDao, cartsDao, authorsDao, messagesDao, usersDao };
