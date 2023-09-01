const express = require("express");
const router = express.Router();

class LocationRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/:locationId", this.controller.getAllByLocation);
    return router;
  };
}

module.exports = LocationRouter;
