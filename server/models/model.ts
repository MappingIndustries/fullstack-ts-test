import mongoose from "mongoose";
import favouritesSchema from "../schema/Weather";
import userSchema from "../schema/Users";

export const Favourites = mongoose.model("weather", userSchema, "favourites")
