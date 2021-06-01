const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

// route handlers
app.use('/', htmlRoutes);
app.use('/api/workouts', apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});