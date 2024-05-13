import express, { json, urlencoded } from 'express';
import db from './models';
import userRouter from './routes/user.route';
import adminRouter from './routes/admin.route';
import floodRouter from './routes/flood.route';
import evacuationRouter from './routes/evacuation.route';

import cors = require('cors');
//if you want in every domain then

db.sync({ force: true })
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message);
  });

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4200',
  'https://swinfloodguard.azurewebsites.net',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/flood', floodRouter);
app.use('/evacuation-point', evacuationRouter);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to express application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
