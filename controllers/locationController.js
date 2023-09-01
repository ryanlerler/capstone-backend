const BaseController = require("./baseController");

class LocationController extends BaseController {
  constructor(model) {
    super(model);
  }

  getAllByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
      const listings = await this.model.findAll({
        where: {
          id: locationId,
        },
        order: [["id", "DESC"]],
      });
      return res.json(listings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = LocationController;
