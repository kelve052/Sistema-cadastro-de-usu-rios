import express from "express";
import getController from "../controllers/controllerUsuario.js";

const router = express.Router()

router.route("/").get(getController)

export default router;