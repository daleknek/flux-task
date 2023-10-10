// const User = require("../models/user.model");

// const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admin only." });
//     }

//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = isAdmin;
