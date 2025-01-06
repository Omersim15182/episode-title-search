import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

import { generateAccessToken } from "../auth/token.js";
import validator from "email-validator";

export const login = async (user) => {
  try {
    const existingUser = await Users.findOne({
      email: user.email,
    });
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        user.password,
        existingUser.password
      );
      if (isPasswordValid) {
        const token = await generateAccessToken(user);

        return { token, userId: existingUser._id };
      } else {
        console.error("Invalid password");
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("Failed to find user");
  }
};

export const register = async (user) => {
  const isValid = validator.validate(user.email);
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
    });

    const isUserCreated = await newUser.save();

    return isUserCreated ? true : false;
  } catch (error) {
    console.error("Failed to create user");
  }
};
