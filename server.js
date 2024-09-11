require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authController = require('./controllers/auth.js');
const inquiryRoute = require('./routes/services.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const app = express();


require('./config/database');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/sign-in', authController);

app.use('/api/inquiries', inquiryRoute);

app.listen(port, () => {
  console.log("Server listening on port", port)
});