import mongoose, { Model, Schema } from "mongoose";
import { IDoggy } from "../types";

const DoggySchema: Schema<IDoggy> = new Schema<IDoggy>({
  breed: { type: String, required: true },
  image: { type: String, required: true },
});

const DoggyModel: Model<IDoggy> = mongoose.model<IDoggy>("Doggy", DoggySchema);

export default DoggyModel;
