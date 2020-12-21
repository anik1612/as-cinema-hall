const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
require("dotenv").config();
const port = 5000;

// middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `${process.env.MONGO_URI}`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// db client connection method
client.connect((err) => {
  // collection list 1
  const movieCollection = client
    .db(process.env.DB)
    .collection(process.env.COLLECTION_1);
  // collection list 2
  const reservationCollection = client
    .db(process.env.DB)
    .collection(process.env.COLLECTION_2);

  // all route list start from here
  // root route
  app.get("/", (req, res) => {
    res.send("<h1>Hello, From AS CINEMA HALL ROOT ROUTE</h1>");
  });

  // movie collection post method
  app.post("/movie/insert", (req, res) => {
    const movie = req.body;
    movieCollection
      .insertMany(movie)
      .then((result) => {
        if (result.insertedCount > 0) {
          res.json({
            success: true,
            data: movie,
          });
        }
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error,
        });
      });
  });

  // movie collection get method
  app.get("/movie/getall", (req, res) => {
    movieCollection.find({}).toArray((error, movies) => {
      if (movies.length > 0 && !error) {
        res.json({
          success: true,
          data: movies,
        });
      } else if (movies.length === 0) {
        res.json({
          success: true,
          data: "Movie Collection is Empty",
        });
      } else {
        res.json({
          success: false,
          error: error,
        });
      }
    });
  });

  // movie seat reservation post method
  app.post("/movie/reservation", (req, res) => {
    const seat = req.body;
    reservationCollection
      .insertMany(seat)
      .then((result) => {
        if (result.insertedCount > 0) {
          res.json({
            success: true,
            data: seat,
          });
        }
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error,
        });
      });
  });

  // movie seat reservation get method
  app.get("/movie/reservation", (req, res) => {
    const name = req.query.name
    reservationCollection.find({name}).toArray((err, reservations) => {
      if (!err && reservations.length > 0) {
        res.json({
          success: true,
          data: reservations,
        });
      } else if (reservations.length === 0) {
        res.json({
          success: true,
          data: "All Seat is Empty & Ready For booking",
        });
      } else {
        res.json({
          success: false,
          error: error,
        });
      }
    });
  });

  // get specific movie available seat by movie name
  app.get("/movie", (req, res) => {
    const movieName = req.query.name;
    movieCollection.find({ movieName }).toArray((error, movie) => {
      if (!error && movie.length > 0) {
        res.json({
          success: true,
          data: movie,
        });
      } else if (movie.length === 0) {
        res.json({
          success: true,
          data: "Nothing found",
        });
      } else {
        res.json({
          success: false,
          error: error,
        });
      }
    });
  });

  // ticket booking information store post route
  app.post("/movie/ticket/booking", (req, res) => {
    const booking = req.body;
    reservationCollection
      .insertOne(booking)
      .then((result) => {
        if (result.insertedCount > 0) {
          res.json({
            success: true,
            data: seat,
          });
        }
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error,
        });
      });
  });

  // ticket booking information get by user name
  app.get("/movie/ticket/booking", (req, res) => {
    const name = req.query.name;
    reservationCollection
      .find({name})
      .toArray((error, document) => {
        if (!error && document.length > 0) {
          res.json({
            success: true,
            data: document,
          });
        } else if (document.length <= 0) {
            res.json({
              success: true,
              data: 'Nothing found'
            })
        } else {
          res.json({
            success: false,
            error: error,
          })
        }
      })
  });

  // update booked seat count
  app.patch('/movie/update/:id', (req, res) => {
    console.log(req.body);
    movieCollection.updateOne({ _id: ObjectId(req.params.id) },
        {
            $set: { bookedSeat: req.body.bookedSeat }
        })
        .then(result => {
            res.json({
              success: true,
              message: 'Update Successfully'
            })
        })
        .catch(error => {
          res.json({
            success: false,
            message: 'Something went wrong'
          })
        })
})

  // console log for db connection showing up
  console.log("database connected");

  // app listen after db connected successfully
  app.listen(process.env.PORT || port, () => {
    console.log(`as-cinema-hall app listening at http://localhost:${port}`);
  });
});
