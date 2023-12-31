const express = require("express");
const router = express.Router();

class ListingRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes = () => {
    router.get("/", this.controller.getAll);
    router.get("/filter", this.controller.getAllFiltered);
    router.get("/top9", this.controller.getTop9Liked);
    router.get("/locations/:locationId", this.controller.getAllByLocation);
    router.get("/users/:userId", this.controller.getAllByUser);
    router.get("/:listingId", this.controller.getOne);
    router.get("/:listingId/likeStatus", this.controller.getLikeStatus);
    router.get("/:listingId/likes", this.controller.getLikeCount);
    router.get("/:listingId/comments", this.controller.getAllComments);

    // router.use(this.checkJwt);

    router.post("/", this.controller.addListing);
    router.post('/:listingId/rented', this.controller.markAsRented)
    router.post("/:listingId/comments", this.controller.addComment);
    router.post("/:listingId/likes", this.controller.toggleLike);
    router.put("/:listingId", this.controller.editListing);
    router.put("/:listingId/comments/:commentId", this.controller.editComment);
    router.delete(
      "/:listingId/comments/:commentId",
      this.controller.deleteComment
    );
    router.delete("/:listingId", this.controller.deleteListing);
    return router;
  };
}

module.exports = ListingRouter;
