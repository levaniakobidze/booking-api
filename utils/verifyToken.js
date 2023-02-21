import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next({
      accsess: false,
      status: 401,
      message: "You are not authenticated!",
      stack: {},
    });
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next({
        accsess: false,
        status: 403,
        message: "Token is not valid!",
        stack: {},
      });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next({
        accsess: false,
        status: 401,
        message: "You are not authorized!",
        stack: {},
      });
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return next({
        accsess: false,
        status: 401,
        message: "You are not authorized!",
        stack: {},
      });
    }
  });
};
