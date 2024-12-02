const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

const sendMoney = async (request, response) => {
  const {
    amount,
    senderId,
    receiverId,
    receiverEmail,
    receiverPhoneNumber,
    description,
  } = request.body;

  if (!amount || !senderId || !receiverId) {
    return response
      .status(400)
      .json({ message: "Amount, Receiver Id, and Sender Id are required" });
  }

  const receiver = await User.findOne({
    $or: [
      { _id: receiverId },
      { email: receiverEmail },
      { phoneNumber: receiverPhoneNumber },
    ],
  });

  if (!receiver) {
    return response.status(404).json({ message: "Receiver not found" });
  }

  const sender = await User.findById(senderId);

  if (sender.balance < amount) {
    return response.status(400).json({ message: "Insufficient balance" });
  }

  sender.balance = (parseFloat(sender.balance) - parseFloat(amount)).toString();
  receiver.balance = (
    parseFloat(receiver.balance) + parseFloat(amount)
  ).toString();

  const session = await User.startSession();
  session.startTransaction();

  try {
    await Promise.all([sender.save(), receiver.save()]);
    const newTransaction = new Transaction({
      amount,
      senderId,
      receiverId: receiver._id,
      description,
      status: "success",
    });
    const savedTransaction = await newTransaction.save();
    await session.commitTransaction();
    session.endSession();
    response.status(201).json({
      message: "Transaction created successfully",
      data: savedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    const newTransaction = new Transaction({
      amount,
      senderId,
      receiverId: receiver._id,
      description,
      status: "failed",
    });
    await newTransaction.save();
    response
      .status(500)
      .json({ message: "Failed to send money", error: error.message });
  }
};

module.exports = sendMoney;
