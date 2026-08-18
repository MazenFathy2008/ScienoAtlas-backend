import { config } from "dotenv";
const file = `.env.${process.env.NODE_ENV || "development"}.local`;
config({ path: file });
export const {
  PORT,
  MONGODB_URI,
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_URL
} = process.env;
