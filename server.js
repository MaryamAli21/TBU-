require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');



const port = process.env.PORT ? process.env.PORT : '3000';
const app = express();

const authController = require('./controllers/auth.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const servicesRoute = require('./routes/services.js');

require('./config/database');


app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL
      })
    })
  );

// app.use(passUserToView);

app.use('/auth', authController);
app.use('/api/services', servicesRoute);

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.set('view engine', 'ejs');



app.listen(port, () => {
  console.log("Server listening on port", port)
});