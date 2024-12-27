import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  console.log(req.cookies.token);

  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Auth failed: No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};
