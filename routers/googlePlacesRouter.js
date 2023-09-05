const express = require("express");
const router = express.Router();

class GooglePlacesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getNearbyPlaces);
    router.get("/photos", this.controller.getPhotos);
    router.get("/details", this.controller.getDetails);
    return router;
  };
}

module.exports = GooglePlacesRouter;
