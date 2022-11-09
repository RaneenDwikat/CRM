import mongoose from "mongoose";

interface customer {
  username: string;
  email: string;
  password: string;
  last_login: Date;
  services:Array<mongoose.Schema.Types.ObjectId>;
}

const customerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  services:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'services'
  }],
  last_login: {
    type: Date,
    default: Date.now(),
  },

},{timestamps:true});

const customerModel = mongoose.model<customer>("customers", customerSchema);
customerModel.createIndexes();

export default customerModel;
