class LikeController {
  constructor(
    model,
    listingModel,
    locationModel,
    propertyTypeModel,
    roomTypeModel,
    fileModel
  ) {
    this.model = model;
    this.listingModel = listingModel;
    this.locationModel = locationModel;
    this.propertyTypeModel = propertyTypeModel;
    this.roomTypeModel = roomTypeModel;
    this.fileModel = fileModel;
  }

  getUserLikedListings = async (req, res) => {
    const { userId } = req.params;
    try {
      const data = await this.model.findAll({
        where: {
          userId,
          liked: true,
        },
        include: [
          {
            model: this.listingModel,
            include: [
              this.locationModel,
              this.propertyTypeModel,
              this.roomTypeModel,
              this.fileModel,
            ],
          },
        ],
        order: [["id", "DESC"]],
      });
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = LikeController;
