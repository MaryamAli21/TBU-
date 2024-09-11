require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const verifyToken = require("./middleware/verifyToken.js");
const authController = require('./controllers/auth.js');
const inquiryRoute = require('./routes/services.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const app = express();


require('./config/database');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/auth', authController);

app.use(verifyToken);
app.use('/api/services', inquiryRoute);

app.listen(port, () => {
  console.log("Server listening on port", port)
});