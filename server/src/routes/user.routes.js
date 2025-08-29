const userRouter = require("express").Router();
const UserController = require("../controllers/User.controller");

userRouter
  .get("/refreshTokens", UserController.refreshTokens)
  .get("/", UserController.getAll)
  .get("/:id", UserController.getById)
  .post("/email", UserController.getByEmail)
  .post("/signup", UserController.signUp)
  .post("/signin", UserController.signIn)
  .post("/signout", UserController.signOut)
  .put("/:id", UserController.updateById)
  .delete("/:id", UserController.deleteById)
  .put("/points/:id", UserController.addPoints);

module.exports = userRouter;
