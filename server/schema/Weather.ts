import mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
  Metric: {
    Value: Number,
    Unit: String,
    UnitType: Number,
  },
  Imperial: {
    Value: Number,
    Unit: String,
    UnitType: Number,
  },
});

const favouriteItemSchema = new mongoose.Schema({
  city: String,
  key: String,
  LocalObservationDateTime: String,
  EpochTime: Number,
  WeatherText: String,
  WeatherIcon: Number,
  HasPrecipitation: Boolean,
  PrecipitationType: String,
  IsDayTime: Boolean,
  Temperature: temperatureSchema,
  MobileLink: String,
  Link: String,
  favourite: Boolean
});

const favouritesSchema = new mongoose.Schema({
  favourites: [favouriteItemSchema]
});

export default favouritesSchema;
