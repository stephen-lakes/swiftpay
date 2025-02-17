import express, { Request, Response, Router } from "express";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";
import { Utility } from "../utils/utilities.ts";
import authenticateUser from "../middlewares/auth.middleware.ts";

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", authenticateUser, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { amount, email, phoneNumber, remark } = req.body;

    if (!email && !phoneNumber) {
      return Utility.sendResponse(res, {
        status: "failed",
        message: "Email or Phone number is required",
        code: 400,
      });
    }

    const [recipient, sender] = await Promise.all([
      userRepository.findOne({ where: { email, phoneNumber } }),
      userRepository.findOne({ where: { id: userId } }),
    ]);

    if (!recipient) {
      return Utility.sendResponse(res, {
        status: "failed",
        message: "Recipient not found",
        code: 404,
      });
    }

    if (!sender) {
      return Utility.sendResponse(res, {
        status: "failed",
        message: "Sender not found",
        code: 404,
      });
    }

    if (sender.balance < amount) {
      return Utility.sendResponse(res, {
        status: "failed",
        message: "Insufficient funds",
        code: 400,
      });
    }

    // Perform the transfer
    sender.balance -= amount;
    recipient.balance += amount;
    await Promise.all([userRepository.save(sender), userRepository.save(recipient)]);

    Utility.sendResponse(res, {
      status: "success",
      message: "Transfer successful",
      code: 200,
      data: {
        amount,
        remark,
        senderBal: sender.balance,
        receiverBal: recipient,
      },
    });
  } catch (error) {
    Utility.sendResponse(res, {
      status: "failed",
      message: "An error occurred",
      code: 500,
    });
  }
});

export default router;
