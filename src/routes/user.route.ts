import { Router } from "express";
import authenticateJWT from "../middlewares/auth.middleware.ts";

const router = Router();


import {
  getBalance,
  getUserByEmail,
  getAllUsers,
  getUserByID,
  getUserByPhoneNumber,
} from "../controllers/user.controller.ts";

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Retrieve a list of all users
 *      description: Retrieve detailed information about all users.
 *      responses:
 *        200:
 *          description: List of users retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: "5044470a-64f7-4279-9984-c3e1c0254993"
 *                        firstName:
 *                          type: string
 *                          example: "John"
 *                        lastName:
 *                          type: string
 *                          example: "Snow"
 *                        email:
 *                          type: string
 *                          example: "5john.snow@example.com"
 *                        phoneNumber:
 *                          type: string
 *                          example: "123456790"
 *                        balance:
 *                          type: object
 *                          properties:
 *                            $numberDecimal:
 *                              type: string
 *                              example: "10000"
 *                        role:
 *                          type: string
 *                          example: "user"
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                          example: "2024-11-29T02:26:17.475Z"
 *                        updatedAt:
 *                          type: string
 *                          format: date-time
 *                          example: "2024-11-29T02:26:17.475Z"
 *                        _v:
 *                          type: integer
 *                          example: "0"
 *        500:
 *          description: Failed to fetch users
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "Failed to fetch users"
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Retrieve detailed information about a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Failed to retrieve user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve user"
 */
router.get("/:id", getUserByID);

/**
 * @swagger
 * /users/phone/{phoneNumber}:
 *   get:
 *     summary: Retrieve a user by phone number
 *     description: Retrieve detailed information about a specific user by their phone number.
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's phone number
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "5044470a-64f7-4279-9984-c3e1c0254993"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Snow"
 *                     email:
 *                       type: string
 *                       example: "john.snow@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+123456790"
 *                     balance:
 *                       type: object
 *                       properties:
 *                         $numberDecimal:
 *                           type: string
 *                           example: "10000"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T02:26:17.475Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T02:26:17.476Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Failed to retrieve user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve user"
 */
router.get("/phone/:phoneNumber", getUserByPhoneNumber);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Retrieve a user by email
 *     description: Retrieve detailed information about a specific user by their email.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email address
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "5044470a-64f7-4279-9984-c3e1c0254993"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Snow"
 *                     email:
 *                       type: string
 *                       example: "john.snow@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+123456790"
 *                     balance:
 *                       type: object
 *                       properties:
 *                         $numberDecimal:
 *                           type: string
 *                           example: "10000"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T02:26:17.475Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-29T02:26:17.476Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Failed to retrieve user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve user"
 */
router.get("/email/:email", getUserByEmail);

// router.get("/balance", authenticateJWT, getBalance);
router.get("/balance", getBalance);

export default router;
