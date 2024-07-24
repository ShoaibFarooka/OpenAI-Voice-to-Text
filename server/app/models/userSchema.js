import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name field is required"],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email."],
      required: [true, "Email field is required"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    usageLimit: {
      type: Number,
      default: 10,
    },
    timesUsed: {
      type: Number,
      default: 0,
    },
    secondsUsed: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

// checking is user exists
userSchema.methods.isUserExist = async function (param) {
  return await User.findOne({ email: param });
};

// checking is password matched
userSchema.methods.isPasswordMatched = async function (
  givenPassword,
  savedPassword
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// create or save works for both
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const password = this.password;
  const hashedPassword = await bcrypt.hashSync(password, 10);

  this.password = hashedPassword;

  next();
});

const User = model("User", userSchema);
export default User;
