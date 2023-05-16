import favouritesSchema from "./Weather";
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
  favourite: Boolean,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  uid: String,
  favourites: [favouriteItemSchema],
});

export default userSchema;
