import { Router } from "express";
import cartsRouter from "./cartRoutes/CartRoutes.js";
import chatsRouter from "./ChatRoutes/chatRoutes.js";
import homeRouter from "./homeRoutes/homeRoutes.js";
import loginRouter from "./register-login/loginRoutes.js";
import logoutRouter from "./register-login/logoutRoutes.js";
import productsRouter from "./ProductRoutes/ProductRoutes.js";
import registerRouter from "./register-login/registerRoutes.js";
import infoRouter from "./infoRouter/infoRouter.js";

const router = Router();

router.use("/", homeRouter);
router.use("/api/login", loginRouter);
router.use("/api/register", registerRouter);
router.use("/api/productos", productsRouter);
router.use("/api/carrito", cartsRouter);
router.use("/api/chat", chatsRouter);
router.use("/api/logout", logoutRouter);
router.use("/info", infoRouter);

export default router;
