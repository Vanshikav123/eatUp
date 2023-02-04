const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://eatUp:123@cluster0.2hi1cdn.mongodb.net/eatUp?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          //reading the data
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const food_category = await mongoose.connection.db.collection(
            "food_category"
          );
          food_category.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.food_category = catData;
            }
          });
        });
      }
    }
  );
};
module.exports = mongoDB;
