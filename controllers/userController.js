const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const { email } = req.params;
    try {
      const user = await this.model.findOne({
        where: {
          email,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  signUp = async (req, res) => {
    const { email, name, profilePicUrl, contactNo, onlineStatus } = req.body;
    try {
      const [user] = await this.model.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          name,
          profilePicUrl,
          contactNo,
          onlineStatus,
        },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const userToEdit = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      const { email, name, profilePicUrl, contactNo } = req.body;
      const updatedUser = await userToEdit.update({
        email,
        name,
        profilePicUrl,
        contactNo,
      });
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = UserController;
