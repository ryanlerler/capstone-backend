const cors = require("cors");
const express = require("express");
require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const PORT = process.env.PORT || 3000;

const UserRouter = require("./routers/userRouter");
const ListingRouter = require("./routers/listingRouter");
const LocationRouter = require("./routers/locationRouter");
const PropertyTypeRouter = require("./routers/propertyTypeRouter");
const RoomTypeRouter = require("./routers/roomTypeRouter");
const LikeRouter = require("./routers/likeRouter");
const GooglePlacesRouter = require("./routers/googlePlacesRouter");
const ChatGptRouter = require("./routers/chatGptRouter");

const UserController = require("./controllers/userController");
const ListingController = require("./controllers/listingController");
const LocationController = require("./controllers/locationController");
const PropertyTypeController = require("./controllers/propertyTypeController");
const RoomTypeController = require("./controllers/roomTypeController");
const LikeController = require("./controllers/likeController");
const GooglePlacesController = require("./controllers/googlePlacesController");
const ChatGptController = require("./controllers/chatGptController");

const db = require("./db/models/index");
const {
  comment,
  file,
  like,
  listing,
  location,
  propertyType,
  roomType,
  user,
  userListing,
  userReview,
} = db;

const userController = new UserController(user);
const listingController = new ListingController(
  listing,
  comment,
  file,
  like,
  location,
  propertyType,
  roomType,
  user
);
const locationController = new LocationController(location);
const propertyTypeController = new PropertyTypeController(propertyType);
const roomTypeController = new RoomTypeController(roomType);
const likeController = new LikeController(
  like,
  listing,
  location,
  propertyType,
  roomType,
  file
);
const googlePlacesController = new GooglePlacesController();
const chatGptController = new ChatGptController();

const userRouter = new UserRouter(userController).routes();
const listingRouter = new ListingRouter(listingController, checkJwt).routes();
const locationRouter = new LocationRouter(locationController).routes();
const propertyTypeRouter = new PropertyTypeRouter(
  propertyTypeController
).routes();
const roomTypeRouter = new RoomTypeRouter(roomTypeController).routes();
const likeRouter = new LikeRouter(likeController).routes();
const googlePlacesRouter = new GooglePlacesRouter(
  googlePlacesController
).routes();
const chatGptRouter = new ChatGptRouter(chatGptController).routes();

// ToDo: Add in Netlify deployed link
const allowedOrigins = [process.env.FRONTEND];
const corsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/listings", listingRouter);
app.use("/locations", locationRouter);
app.use("/property-type", propertyTypeRouter);
app.use("/room-type", roomTypeRouter);
app.use("/likes", likeRouter);
app.use("/places", googlePlacesRouter);
app.use("/chatgpt", chatGptRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
