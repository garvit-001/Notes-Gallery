const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://garvit_001:INTERNDEDo%40123@cluster0.8di5gau.mongodb.net/test";

mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => console.log("connected"));
};

module.exports = connectToMongo;
