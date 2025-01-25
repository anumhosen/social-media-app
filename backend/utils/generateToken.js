import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents XXS attacks
    sameSite: true, // CSRF attacks cross-site request forgery (CSRF) attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds (cookies)
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
  });
};

export default generateTokenAndSetCookie;
