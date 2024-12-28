import mongoose, { model } from "mongoose";
const { DATABASE_URL } = process.env;
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));

  if (conn) {
    console.log("Database connected successfully");
  }
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  });

  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

  return { conn, Todo };
};

export default connect;