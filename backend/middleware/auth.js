import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export function signSession(user) {
  return jwt.sign(
    { sub: user.email, name: user.name, picture: user.picture },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { email: payload.sub, name: payload.name, picture: payload.picture };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}
