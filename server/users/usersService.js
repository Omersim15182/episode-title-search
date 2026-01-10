import bcrypt from "bcryptjs";
import Users from "./model/Users.js";
import RegistrationProcess from "./model/RegistrationProcess.js";
import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";
import { generateAccessToken } from "../auth/token.js";
import emailValid from "email-validator";
import UserRepository from "./user-repository.js";
import { verifyEmail } from "../auth/sendEmail.js";
import createEmailCode from "../utils/generateEmailCode.js";

export const login = async (user) => {
  try {
    const existingUser = await Users.findOne({
      email: user.email,
    });

    if (!existingUser) {
      throw new NotFoundError("User not exist failed");
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new NotFoundError("Invalid password");
    }
    const token = await generateAccessToken(user);
    return { token, userId: existingUser._id };
  } catch (error) {
    throw new InternalServerError("Login Failed", error.message);
  }
};

export const register = async (user) => {
  try {
    /////////////////////
    const existingUser = await Users.findOne({
      $or: [{ _id: "121233" }, { email: "omersim1511281@gmail.com" }],
    });

    if (existingUser) {
      console.log("User is already registered");
      return { success: false, message: "User is already registered" };
    }
    const hashedPassword = await bcrypt.hash("omersim15182@gmail.com", 10);

    const newUser = new Users({
      _id: "121233", // אם אתה רוצה ID ידני
      name: "Omer Simhi",
      email: "omersim1511281@gmail.com",
      password: hashedPassword,
      photo: null, // אפשר לשים URL אם יש
    });

    await newUser.save();
    console.log("User registered successfully!");
  } catch (err) {
    console.error("Failed to register user:", err.message);
  }
  /////////////////////////////////////
  const isValid = emailValid.validate(user.email);
  if (!isValid) {
    throw new NotFoundError("Invalid email format");
  }

  if (user.password.length < 8) {
    throw new NotFoundError("Password must be at least 8 characters long");
  }
  const existingUser = await Users.findOne({ email: user.email });
  if (existingUser) {
    throw new NotFoundError("user is already registered");
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const key = createEmailCode();
    const newRegistrationProcess = new RegistrationProcess({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      photo: user.photo,
      code: key,
    });
    await newRegistrationProcess.save();
    await verifyEmail(user.email, key);
    return true;
  } catch (error) {
    throw new InternalServerError("Failed to create user");
  }
};

export const inProcess = async (code) => {
  try {
    const user = await RegistrationProcess.findOne({ code });
    if (!user) throw new NotFoundError("Invalid user ");

    const newUser = new Users({
      name: user.name,
      email: user.email,
      password: user.password,
      photo: user.photo,
    });
    await newUser.save();
    await RegistrationProcess.deleteOne({ code });
    return true;
  } catch (error) {
    throw new InternalServerError("Failed to confirm register user ");
  }
};
export const getUserInfo = async (userId) => {
  try {
    const user = await UserRepository.getUserInfoData(userId);
    if (user) {
      return user;
    }
    throw new NotFoundError("Invalid user Info");
  } catch (error) {
    throw new InternalServerError("Failed to fetch user info");
  }
};
