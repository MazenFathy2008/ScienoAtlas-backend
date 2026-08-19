import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.development.local" });
}
export const {
  PORT,
  MONGODB_URI,
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_URL,
} = process.env;
