const mongoose = require("mongoose");

const { MONGO_DB_URL } = process.env;

module.exports = connect = async () => {
  // const mongo = await mongoose.createConnection(MONGO_DB_URL);
  // console.log(!!mongo);
  // mongo.on("connected", () => {
  //   console.log("db Connected SucessFully");
  // });
  mongoose.connect(
    MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (e) => {
      if (e) {
        console.log(e.message);
      } else {
        console.log("Db Connected Sucessfully");
      }
    }
  );
};
