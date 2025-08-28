const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });
const iwtConfig = require("../config/jwtConfig");

const generateJWTTokens = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.SECRET_ACCESS_TOKEN,
    iwtConfig.access
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.SECRET_REFRESH_TOKEN,
    iwtConfig.refresh
  ),
});

module.exports = generateJWTTokens