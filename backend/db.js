const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://kuraabhiram5:kuraabhiram5@gofood.kq5zsrs.mongodb.net/gofood_mern?retryWrites=true&w=majority&appName=gofood";

const mongoDB = async () => {
  // try {
  //   await mongoose.connect(mongoURI);
  //   console.log("Connected to MongoDB");
  //   const fetched_data = await mongoose.connection.db.collection("food_items")
  //   fetched_data.find({}).toArray(async function(err,data){
  //     const foodcategory = await mongoose.connection.db.collection("food_category")
  //     foodcategory.find({}).toArray(function(err,cat_data){
  //       if(err) console.log(err);
  //       else {
  //         global.food_items = data
  //         global.foodcategory = cat_data
  //         console.log(global.foodcategory)
  //       }
  //     })
      
  //   })
    
  // } catch (error) {
  //   console.error("Error connecting to MongoDB:", error.message);
  // }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
  
    const [foodItemsData, foodCategoryData] = await Promise.all([
      foodItemsCollection.find({}).toArray(),
      foodCategoryCollection.find({}).toArray()
    ]);
  
    global.food_items = foodItemsData;
    global.food_category = foodCategoryData;
  
    // console.log("Food Items:", global.food_items);
    // console.log("Food Categories:", global.food_category);
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }

};

module.exports = mongoDB;


 // try {
  //   await mongoose.connect(mongoURI);
  //   console.log("Connected to MongoDB");

  //   // Fetch food_items data
  //   const foodItemsCollection = mongoose.connection.db.collection("food_items");
  //   const foodItemsData = await foodItemsCollection.find({}).toArray();

  //   // Fetch food_category data
  //   const foodCategoryCollection = mongoose.connection.db.collection("food_category");
  //   const foodCategoryData = await foodCategoryCollection.find({}).toArray();

  //   // Store data in global variables or return as needed
  //   global.food_items = foodItemsData;
  //   global.food_category = foodCategoryData;

  //   // console.log("Food Items:", global.food_items);
  //   // console.log("Food Categories:", global.food_category);

  // } catch (error) {
  //   console.error("Error connecting to MongoDB:", error.message);
  // }