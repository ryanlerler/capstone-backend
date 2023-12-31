const express = require("express");
const router = express.Router();

class RoomTypeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    return router;
  };
}

module.exports = RoomTypeRouter;
