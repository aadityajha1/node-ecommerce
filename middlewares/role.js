const User = require("../models/User");

function checkRole(roles) {
  return async (req, res, next) => {
    const { userId } = req.user;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(userId);

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route" });
    }

    next();
  };
}

module.exports = checkRole;
