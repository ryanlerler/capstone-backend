const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/:email", this.controller.getOne);
    router.post("/", this.controller.signUp);
    router.put("/", this.controller.updateProfile);
    return router;
  };
}

module.exports = UserRouter;
