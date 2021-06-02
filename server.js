const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// routes
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// route handlers
app.use('/', htmlRoutes);
app.use('/api/workouts', apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
