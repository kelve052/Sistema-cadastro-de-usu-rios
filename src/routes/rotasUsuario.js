import express from "express";
import { getController, postController, putController } from "../controllers/controllerUsuario.js";

const router = express.Router()

router.route("/").get(getController)
router.route("/criarUsuario").post(postController)
router.route("/atualizarUsuario/:id").put(putController)

export default router;