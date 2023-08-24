const db = require("../db/models/index");

const BaseController = require("./baseController");

class ListingController extends BaseController {
  constructor(
    model,
    commentModel,
    fileModel,
    likeModel,
    locationModel,
    propertyTypeModel,
    roomTypeModel,
    userModel
  ) {
    super(model);
    this.commentModel = commentModel;
    this.fileModel = fileModel;
    this.likeModel = likeModel;
    this.locationModel = locationModel;
    this.propertyTypeModel = propertyTypeModel;
    this.roomTypeModel = roomTypeModel;
    this.userModel = userModel;
  }

  getAllByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
      const listings = await this.model.findAll({
        where: {
          locationId,
        },
        order: [["id", "DESC"]],
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOne = async (req, res) => {
    const { listingId } = req.params;
    try {
      const listing = await this.model.findByPk(listingId, {
        include: [this.locationModel, this.userModel],
      });
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addListing = async (req, res) => {
    try {
      const { email } = req.body;

      const [user] = await this.userModel.find({
        where: {
          email,
        },
      });

      const newListing = await this.model.create({
        userId: user.id,
      });

      const selectedLocation = await this.locationModel.findByPk(locationId);
      await newListing.setLocation(selectedLocation);

      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getLikeStatus = async (req, res) => {
    const { listingId } = req.params;
    const { email } = req.query;

    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      const like = await this.likeModel.findOne({
        where: {
          userId: user.id,
          listingId,
        },
      });

      if (!like) {
        return res.json({ likeStatus: false });
      }

      return res.json({ likeStatus: like.likeStatus });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getLikeCount = async (req, res) => {
    const { listingId } = req.params;
    try {
      const likes = await this.likeModel.findAll({
        where: {
          listingId,
          likeStatus: true,
        },
      });
      return res.json(likes.length);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  toggleLike = async (req, res) => {
    const { listingId } = req.params;
    const { email } = req.body;
    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      let existingLike = await this.likeModel.findOne({
        where: {
          listingId,
          userId: user.id,
        },
      });

      if (!existingLike) {
        const newLike = await this.likeModel.create({
          likeStatus: true,
          listingId,
          userId: user.id,
        });
        return res.json(newLike);
      } else {
        await existingLike.update({
          likeStatus: !existingLike.likeStatus,
        });
        return res.json(existingLike);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllComments = async (req, res) => {
    const { listingId } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: {
          listingId,
        },
        order: [["id", "DESC"]],
        include: this.userModel,
      });
      return res.json(allComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addComment = async (req, res) => {
    const { listingId } = req.params;
    const { text, email } = req.body;
    try {
      const [user] = await this.userModel.find({
        where: {
          email,
        },
      });

      const newComment = await this.commentModel.create({
        text,
        listingId,
        userId: user.id,
      });

      const commentWithUser = await this.commentModel.findByPk(newComment.id, {
        include: this.userModel,
      });

      return res.json(commentWithUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editListing = async (req, res) => {
    const { listingId } = req.params;
    try {
      const listingToEdit = await this.model.findByPk(listingId);
      await listingToEdit.update({
        ...req.body,
      });
      const selectedLocation = await this.locationModel.findByPk(
        req.body.locationId
      );
      await listingToEdit.setLocation(selectedLocation);

      const editedListing = await this.model.findAll({
        include: this.locationModel,
        order: [["id", "ASC"]],
      });
      return res.json(editedListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editComment = async (req, res) => {
    const { listingId, commentId } = req.params;
    const { text } = req.body;
    try {
      const commentToEdit = await this.commentModel.findOne({
        where: {
          listingId,
          id: commentId,
        },
      });
      const updatedComment = await commentToEdit.update({ text });
      const commentWithUser = await this.commentModel.findByPk(
        updatedComment.id,
        {
          include: this.userModel,
        }
      );
      return res.json(commentWithUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  deleteComment = async (req, res) => {
    const { listingId, commentId } = req.params;
    try {
      await this.commentModel.destroy({
        where: {
          id: commentId,
          listingId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  deleteListing = async (req, res) => {
    const { listingId } = req.params;
    try {
      await this.likeModel.destroy({
        where: {
          listingId,
        },
      });

      await this.commentModel.destroy({
        where: {
          listingId,
        },
      });

      await this.model.destroy({
        where: {
          id: listingId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getTop9Liked = async (req, res) => {
    try {
      const listingsWithLikes = await this.model.findAll({
        include: [
          {
            model: this.likeModel,
            where: { likeStatus: true },
          },
        ],
      });

      const listingsWithLikeCounts = listingsWithLikes.map((listing) => ({
        ...listing.toJSON(),
        likeCount: listing.likes.length,
      }));

      listingsWithLikeCounts.sort((a, b) => b.likeCount - a.likeCount);

      const top9LikedListings = listingsWithLikeCounts.slice(0, 9);

      return res.json(top9LikedListings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = ListingController;
