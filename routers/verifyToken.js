const jwt = require("jsonwebtoken");

////middle ware
const verifyToken = (req, res, next) => {
  const autoHeader = req.headers.token;
  if (autoHeader) {
    const token = autoHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};
const verifyTokenAndauthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that");
    }
  });
};

////verify token for admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that");
    }
  });
};
////////////////////////

module.exports = {
  verifyToken,
  verifyTokenAndauthorization,
  verifyTokenAndAdmin,
};
