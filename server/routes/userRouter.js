const userRouter = require("express").Router();
const {
  getAllUsers,
  getRedactedUsers,
  getCurrentUser,
  getUserById,
  loginUser,
  registerUser,
  sendInvite,
  cancelInvite,
  acceptInvite,
  rejectInvite,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers);
userRouter.get("/redacted", getRedactedUsers);
userRouter.get("/current", getCurrentUser);
userRouter.get("/:id", getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/invite", sendInvite);
userRouter.put("/invite/cancel", cancelInvite);
userRouter.put("/invite/accept", acceptInvite);
userRouter.put("/invite/reject", rejectInvite);

module.exports = userRouter;
