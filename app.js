const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const adminRoutes = require('./router/admin');
const userRoutes = require('./router/user');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config()

app.use("/admin",adminRoutes);
app.use("/user",userRoutes);

// app.listen(3000, () => {
//     console.log("Server Started");
// })

mongoose
  .connect(process.env.MONGO_URL)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
