import { login as login, register } from "../api/usersService.js";

export async function loginUser(req, res) {
  const user = req.body;
  console.log("body", req.body);

  const token = await login(user);
  if (token) {
    res.cookie("token", token, {
      path: "/",
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ message: "User logged in successfully." });
  } else {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "An error occurred during login." });
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
