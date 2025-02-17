import express, { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.ts";
import TransferController from "../controllers/transfer.controller.ts";

const router: Router = express.Router();

router.post("/", authenticateUser, TransferController.transfer);

export default router;
