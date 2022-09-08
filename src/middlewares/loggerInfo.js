import { infoLogger } from "../utils/logger.utils.js";

const loggerInfo = async (req, res, next) => {
	const route = req.url;
	const method = `[${req.method}]`;
	infoLogger.info({ route, method });
	next();
};

export default loggerInfo;
