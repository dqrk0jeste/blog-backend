const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (e, decoded) => {
        if (e) {
          res.sendStatus(403);
          return;
        }
        req.user = decoded.user;
        next();
      }
    );
}

const validJWT = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { verifyUser, validJWT };