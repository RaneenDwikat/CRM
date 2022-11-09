import mongoose from "mongoose";

interface employee{
    username: string;
    email: string;
    password: string;
    last_login: Date;
}
const employeeSchema = new mongoose.Schema<employee>({
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default:new Date(),
    },

  },{timestamps:true});
  
  const employeeModel = mongoose.model<employee>("employees", employeeSchema);
  employeeModel.createIndexes();
  
  export default employeeModel;
  