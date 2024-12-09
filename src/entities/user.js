const { EntitySchema } = require("typeorm");
const { v4: uuidv4 } = require("uuid");

module.exports = new EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      default: () => uuidv4(),
    },
    firstName: {
      type: "varchar",
      nullable: false,
    },
    lastName: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    phoneNumber: {
      type: "varchar",
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    balance: {
      type: "decimal",
      precision: 10,
      scale: 2,
      default: 10000.0,
    },
    role: {
      type: "varchar",
      default: "user",
    },
    isVerified: {
      type: "boolean",
      default: false,
    },
    otp: {
      type: "varchar",
      nullable: true,
    },
    otpExpiresAt: {
      type: "timestamp",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
