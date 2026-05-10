/* ============================================
   Environment Config — Load and export env vars
   ============================================ */

import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/traveloop',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default env;
