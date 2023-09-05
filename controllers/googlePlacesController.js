const axios = require("axios");

class GooglePlacesController {
  constructor(model) {
    this.model = model;
  }

  getNearbyPlaces = async (req, res) => {
    const placeTypes = [
      "restaurant",
      "atm",
      "convenience_store",
      "shopping_mall",
      "transit_station",
    ];

    const { latitude, longitude } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
      const placesData = [];

      for (const placeType of placeTypes) {
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 500,
              type: placeType,
              key: apiKey,
            },
          }
        );

        if (response.data.status === "OK") {
          placesData.push(...response.data.results);
        }
      }

      res.json(placesData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getPhotos = async (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
      const { placeId } = req.query;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`
      );

      if (response.data.result && response.data.result.photos) {
        const photos = response.data.result.photos.map((photo) => {
          // Generate a URL for each photo
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
        });
        res.json(photos);
      } else {
        res.json([]);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  getDetails = async (req, res) => {
    try {
      const placeId = req.query.placeId;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,reviews&key=${apiKey}`
      );

      const placeDetails = response.data.result;
      res.json(placeDetails);
    } catch (error) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = GooglePlacesController;
