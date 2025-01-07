import { login as login, register } from "./usersService.js";

export async function loginUser(req, res) {
  const user = req.body;

  let response;
  try {
    response = await login(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const { token, userId } = response;
  console.log("to", token);
  console.log("userId", userId);

  if (token) {
    res.cookie("token", token, {
      path: "/",
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully.", userId: userId });
  } else {
    return res.status(404).json({ message: "User not found." });
  }
}

export async function verifyUser(req, res) {
  try {
    return res.status(200).json({ message: "User is verify" });
  } catch (error) {
    return res.status(401).json({ message: "User is not verify" });
  }
}

export async function registerUser(req, res) {
  const user = req.body;
  const result = await register(user);
  if (result)
    return res.status(200).json({ message: "successful to create user" });
  else {
    return res.status(500).json({
      message: "Faild to register user try diffrent email or password",
    });
  }
}
