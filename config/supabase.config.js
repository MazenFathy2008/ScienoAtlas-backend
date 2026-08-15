import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SECRET_KEY, SUPABASE_URL } from "./env.js";
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);
supabase.storage.from("pdfs").upload
