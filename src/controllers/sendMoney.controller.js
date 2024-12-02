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

  // if (
  //   (!amount || !senderId || !receiverId || receiverEmail,
  //   receiverPhoneNumber,
  //   description)
  // )
  if (!amount || !senderId || !receiverId)
    return response
      .status(400)
      .json({ message: "Amount, Receiver Id and Sender Id are required" });

  let receiver;
  if (receiverId) receiver = await User.findById(receiverId);
  else if (receiverEmail)
    receiver = await User.findOne({ email: receiverEmail });
  else if (receiverPhoneNumber)
    receiver = await User.findOne({ phoneNumber: receiverPhoneNumber });

  if (!receiver) return response.status(404).json({ message: "Receiver not found" });

  const sender = await User.findById(senderId);

  if (sender.balance < amount)
    return response.status(400).json({ message: "Insufficient balance" });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  const newTransaction = Transaction({
    amount,
    senderId,
    receiverId: receiver._id,
    description,
  });

  try {
    const savedTransaction = await newTransaction.save();
    response.status(201).json({
      message: "Transaction created successfully",
      data: savedTransaction,
    });
  } catch (error) {
    response.status(500).json({ message: "Failed to send Money" });
  }
};

module.exports = sendMoney;
