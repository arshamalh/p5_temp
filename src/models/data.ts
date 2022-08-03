import mongoose from "mongoose";

let DataSchema = new mongoose.Schema({
  special_id_field: { type: String, unique: true },
  other_field_1: String,
  other_field_2: Number,
});

const DataModel = mongoose.model("data", DataSchema);

export function getData(special_id_field: string): Promise<any> {
  return new Promise((resolve, reject) => {
    DataModel.findOne({ special_id_field }, async (err: string, res: any) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export default DataModel;
