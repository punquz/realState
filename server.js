const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const color = require('colors');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

//Load env var
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//Route Files
const planets = require('./routes/planets');
const users = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//add cors
app.use(cors());

//sanitization
app.use(mongoSanitize());

//Set securtiy headers
app.use(helmet());

//Prevent XSS attack
app.use(xss());

//Mount Routes
app.use('/api/v1/planets', planets);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/*
==========================
Magic happens at port 5000
==========================
**/
const server = app.listen(
  PORT,
  console.log('App listening on port 5000!'.yellow.bold)
);

//handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
