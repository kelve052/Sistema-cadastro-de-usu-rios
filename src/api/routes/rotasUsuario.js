import express from "express";
import { getController, postController, putController, deleteController, getLogins, login, logout, postAtivar, deleteDesativar} from "../controllers/controllerUsuario.js";

const router = express.Router()

router.route("/listarUsuarios").get(getController)
router.route("/criarUsuario").post(postController)
router.route("/atualizarUsuario/:id").put(putController)
router.route("/deletarUsuario/:id").delete(deleteController)

router.route("/login").get(getLogins)
router.route("/login").post(login)
router.route("/logout").delete(logout)

router.route('/ativar').post(postAtivar)
router.route('/desativar').delete(deleteDesativar)
export default router;