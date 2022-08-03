import mongoose from "mongoose";

let movieSchema = new mongoose.Schema({
  special_id_field: { type: String, unique: true },
  other_field_1: String,
  other_field_2: Number,
});

const MovieModel = mongoose.model("movie", movieSchema);

export function getData(special_id_field: string): Promise<any> {
  return new Promise((resolve, reject) => {
    MovieModel.findOne({ special_id_field }, async (err: string, res: any) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export default MovieModel;
