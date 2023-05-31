import express from "express";
import { getAllPermissions } from "./permission.controller";

const router = express.Router();

router.route("/").get(getAllPermissions);

export default router;
