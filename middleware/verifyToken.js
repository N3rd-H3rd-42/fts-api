const jwt = require("jsonwebtoken");
const config = require("../config/constants");

const verifyToken = (request, response, next) => {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];
  if (!token)
    return response.status(403).json({ msg: "access token required" });
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    request.user = decoded;
  } catch (error) {
    return response.status(403).json({ msg: "Invaild token" });
  }
  return next();
};

module.exports = verifyToken;
