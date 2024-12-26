import { isLoggedIn, register } from "../api/usersService.js";

export async function loginUser(req, res) {
  const { email } = req.body;
  console.log("test");

  const response = await isLoggedIn(email);
  if (response) {
    return res.status(200).json({ message: "user is logged in" });
  } else {
    return res.status(500).json({
      message: "Error in check if logged in.",
    });
  }
}

export async function registerUser(req, res) {
  const user = req.body;
  const result = await register(user);
  if (result)
    return res.status(200).json({ message: "successful to create user" });
  else {
    return res
      .status(500)
      .json({ message: "Faild to register user try diffrent email" });
  }
}
