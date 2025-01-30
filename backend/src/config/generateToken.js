import JWT from "jsonwebtoken";

export const generateToken = (user) => {
  return JWT.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "10h",
    }
  );
};
