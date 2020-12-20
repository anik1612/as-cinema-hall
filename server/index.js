const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const port = 5000;

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `${process.env.MONGO_URI}`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// db client connection method
client.connect((err) => {
  // collection list
  const movieCollection = client
    .db(process.env.DB)
    .collection(process.env.COLLECTION_1);

  // all route list start from here
  // root route
  app.get("/", (req, res) => {
    res.send("<h1>Hello, From AS CINEMA HALL ROOT ROUTE</h1>");
  });

  // movie collection post method
  app.post("/movie/insert", (req, res) => {
    const movie = req.body;
    movieCollection.insertMany(movie)
    .then((result) => {
        if(result.insertedCount > 0) {
            res.json({
                success: true,
                data: movie
            })
        }
    })
    .catch(error => {
        res.json({
            success: false,
            error: error
        })
    })
  });

  // console log for db connection showing up
  console.log("database connected");

  // app listen after db connected successfully
  app.listen(process.env.PORT || port, () => {
    console.log(`as-cinema-hall app listening at http://localhost:${port}`);
  });
});
