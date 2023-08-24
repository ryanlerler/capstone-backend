const express = require("express");
const router = express.Router();

class PropertyTypeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    return router;
  };
}

module.exports = PropertyTypeRouter;
