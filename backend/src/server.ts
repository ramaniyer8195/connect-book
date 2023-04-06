import app from "./app";
import env from "./helper/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// connect mongodb
mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connected successfully!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
