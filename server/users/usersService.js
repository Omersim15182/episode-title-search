import bcrypt from "bcryptjs";
import Users from "./model/Users.js";
import { InternalServerError, NotFoundError } from "../custom-errors/errors.js";
import { generateAccessToken } from "../auth/token.js";
import emailValid from "email-validator";
import UserRepository from "./user-repository.js";

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
  const isValid = emailValid.validate(user.email);
  if (!isValid) {
    console.error("Invalid email format");
    return false;
  }

  if (user.password.length < 8) {
    console.error("Password must be at least 8 characters long");
    return false;
  }
  const existingUser = await Users.findOne({ email: user.email });
  if (existingUser) {
    return false;
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new Users({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      photo: user.photo,
    });

    const isUserCreated = await newUser.save();

    return isUserCreated ? true : false;
  } catch (error) {
    throw new InternalServerError("Failed to create user");
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
