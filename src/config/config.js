import "dotenv/config";

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_SECRET: NULL,
  CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB,
  CLIENT_SECRET_GITHUB: process.env.CLIENT_SECRET_GITHUB,
};
