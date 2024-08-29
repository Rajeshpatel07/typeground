import { Router } from "express";
import { createCustomRoom, getText, home } from "../controllers/controllers.js";
const router = Router();

router.route("/").get(home);
router.route("/gettext").get(getText);
router.route("/customroom").post(createCustomRoom);

export default router
