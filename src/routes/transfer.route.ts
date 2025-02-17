import express, { Request, Response, Router } from "express";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";
import { Utility } from "../utils/utilities.ts";
import authenticateUser from "../middlewares/auth.middleware.ts";

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", authenticateUser, async (req: Request, res: Response) => {
  const userId = req.userId;
  const {amount, email, phoneNumber, remark} = req.body;

  if(email || phoneNumber)
      Utility.sendResponse(res, {
      status:`failed`,
      message: `Email or Phone number is required`,
      code: 400,
    })

  const recipient = await userRepository.findOne({
    where: [
      { email, phoneNumber }
    ],
  });

  const sender = await userRepository.findOne({
    where: [
      {id: userId}
    ]
  })

  Utility.sendResponse(res, {
    status:`success`,
    message: `Transfer successful`,
    code:200,
    data: {
      amount, remark
    }
  })
})


export default router;
