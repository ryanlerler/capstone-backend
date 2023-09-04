const express = require("express");
const router = express.Router();

class LikeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/:userId", this.controller.getUserLikedListings);
    return router;
  };
}

module.exports = LikeRouter;
