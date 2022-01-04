const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("BD online");
  } catch (error) {
    console.log(error);
    throw new Error("Something wrong with DB");
  }
};

module.exports = {
  dbConnection,
};
