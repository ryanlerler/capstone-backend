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


const UserController = require("./controllers/userController");
const ListingController = require("./controllers/listingController");
const LocationController = require("./controllers/locationController");
const PropertyTypeController = require("./controllers/propertyTypeController");
const RoomTypeController = require("./controllers/roomTypeController");
const LikeController = require("./controllers/likeController");

const db = require("./db/models/index");
const {
  comment,
  conversation,
  file,
  like,
  listing,
  location,
  message,
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
const likeController = new LikeController(like, listing, location, propertyType, roomType, file);

const userRouter = new UserRouter(userController).routes();
const listingRouter = new ListingRouter(listingController, checkJwt).routes();
const locationRouter = new LocationRouter(locationController).routes();
const propertyTypeRouter = new PropertyTypeRouter(
  propertyTypeController
).routes();
const roomTypeRouter = new RoomTypeRouter(roomTypeController).routes();
const likeRouter = new LikeRouter(likeController).routes();

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

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with id: " + socket.id);
  socket.on("createTopic", (topic) => {
    socket.join(topic);
    console.log("topic created");
  });

  socket.on("send-message", (data) => {
    io.to(data.topic).emit("receive-message", {
      sender: socket.id,
      message: data.inputMessage,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
