import bcrypt from "bcryptjs";

import Users from "../models/Users.js";
import { generateAccessToken } from "../auth/token.js";

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
        const token = generateAccessToken(user);
        return token;
      } else {
        console.log("Invalid password");
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("Failed to find user");
  }
};

export const register = async (user) => {
  console.log(user);
  const existingUser = await Users.findOne({ email: user.email });
  if (existingUser) {
    console.log("Email already exists");
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
    console.log("iscreated", isUserCreated);

    return isUserCreated ? true : false;
  } catch (error) {
    console.error("Failed to create user");
  }
};
