import { Router } from "express";
import { info } from "./info.controller.js";
import compression from "compression";

const infoRouter = Router();

const isCompression = [];
for (let i = 0; i < process.argv.length; i++) {
	if (process.argv[i] == "-c")
		isCompression.push(
			process.argv[i + 1] == "false"
				? false
				: process.argv[i + 1] == "true"
				? true
				: process.argv[i + 1]
		);
	else isCompression[0] = true;
}
if (isCompression[0])
	infoRouter.get("/", compression(), async (req, res) => {
		res.send(info);
	});
else
	infoRouter.get("/", async (req, res) => {
		// console.log("con console.log");
		res.send(info);
	});

export default infoRouter;
