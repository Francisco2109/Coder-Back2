import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import config from "./config/config.js";
import { initMongoDB } from "./config/db-connection.js";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
// mongoose.connect("mongodb+srv://admin-user:B4YW5GZcy8iGuzH3@cluster0.8ysuhwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// .then(() => console.log("MongoDB connected success"))
// .catch((e) => console.error("MongoDB Error: \n" + e))
const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    ttl: 60,
    crypto: {
      secret: config.SECRET_KEY,
    },
  }),
  secret: config.SECRET_KEY,
  cookie: {
    maxAge: 60000,
    httpOnly: true,
  },
  saveUninitialized: true,
  resave: false,
};

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_KEY));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(config.PORT,()=>console.log(`Listening on ${config.PORT}`))
