const taskRouter = require("express").Router();
const TaskController = require("../controllers/Task.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

taskRouter
  .get("/", TaskController.getAll)
  .get("/:id", TaskController.getById)
  .post("/", verifyAccessToken, TaskController.create)
  .put("/:id", verifyAccessToken, TaskController.updateById)
  .delete("/:id", verifyAccessToken, TaskController.deleteById);

module.exports = taskRouter;
