const { where } = require("sequelize");
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

  getAll = async (req, res) => {
    try {
      const data = await this.model.findAll({
        include: [
          this.locationModel,
          this.propertyTypeModel,
          this.roomTypeModel,
          this.fileModel,
        ],
        order: [["id", "DESC"]],
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
      const listings = await this.model.findAll({
        where: {
          locationId,
        },
        include: [
          this.locationModel,
          this.propertyTypeModel,
          this.roomTypeModel,
          this.fileModel,
        ],
        order: [["id", "DESC"]],
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getAllByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const listings = await this.model.findAll({
        where: {
          userId,
        },
        include: [
          this.locationModel,
          this.propertyTypeModel,
          this.roomTypeModel,
          this.fileModel,
        ],
        order: [["id", "DESC"]],
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getOne = async (req, res) => {
    const { listingId } = req.params;
    try {
      const listing = await this.model.findByPk(listingId, {
        include: [
          this.locationModel,
          this.userModel,
          this.propertyTypeModel,
          this.roomTypeModel,
          this.fileModel,
        ],
      });
      return res.json(listing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  addListing = async (req, res) => {
    console.log("addlisting");
    const { email, photoUrls } = req.body;
    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      const newListing = await this.model.create({
        ...req.body,
        userId: user.id,
      });

      let files = [];
      for (let i = 0; i < photoUrls.length; i++) {
        files.push(
          await this.fileModel.create({
            type: "image",
            url: photoUrls[i],
            listingId: newListing.id,
          })
        );
      }

      await newListing.setFiles(files);

      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
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
        return res.json({ liked: false });
      }

      return res.json({ liked: like.liked });
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
          liked: true,
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
          liked: true,
          listingId,
          userId: user.id,
        });
        return res.json(newLike);
      } else {
        await existingLike.update({
          liked: !existingLike.liked,
        });
        return res.json(existingLike);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
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
      const user = await this.userModel.findOne({
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

    const { email, photoUrls } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: {
          email,
        },
      });

      const listingToEdit = await this.model.findByPk(listingId);

      await listingToEdit.update({
        ...req.body,
        userId: user.id,
      });

      // Delete existing photoUrls associated with the listing
      await this.fileModel.destroy({
        where: {
          listingId: listingToEdit.id,
        },
      });

      let files = [];
      for (let i = 0; i < photoUrls.length; i++) {
        files.push(
          await this.fileModel.create({
            type: "image",
            url: photoUrls[i],
            listingId: listingToEdit.id,
          })
        );
      }

      return res.json(listingToEdit);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
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
      await Promise.all([
        this.fileModel.destroy({ where: { listingId } }),
        this.likeModel.destroy({ where: { listingId } }),
        this.commentModel.destroy({ where: { listingId } }),
      ]);

      await this.model.destroy({
        where: {
          id: listingId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getTop9Liked = async (req, res) => {
    try {
      const listingsWithFiles = await this.model.findAll({
        include: [
          {
            model: this.fileModel, // Include the files associated with listings
          },
        ],
      });

      // Extract listing IDs to fetch likes for these listings
      const listingIds = listingsWithFiles.map((listing) => listing.id);

      // Fetch likes for the listings
      const likesForListings = await this.likeModel.findAll({
        where: {
          liked: true,
          listingId: listingIds,
        },
      });

      // Create a map to associate likes with listings
      const likesByListingId = {};
      likesForListings.forEach((like) => {
        const listingId = like.listingId;
        if (!likesByListingId[listingId]) {
          likesByListingId[listingId] = [];
        }
        likesByListingId[listingId].push(like);
      });

      // Combine listings with their associated likes
      const listingsWithLikes = listingsWithFiles.map((listing) => ({
        ...listing.toJSON(),
        likes: likesByListingId[listing.id] || [], // Attach associated likes
      }));

      // Calculate like counts for each listing
      const listingsWithLikeCounts = listingsWithLikes.map((listing) => ({
        ...listing,
        likeCount: listing.likes.length,
      }));

      // Sort by like count
      listingsWithLikeCounts.sort((a, b) => b.likeCount - a.likeCount);

      // Get the top 9 liked listings
      const top9LikedListings = listingsWithLikeCounts.slice(0, 9);

      return res.json(top9LikedListings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = ListingController;
