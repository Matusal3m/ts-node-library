import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const apiKey = process.env.SUPABASE_KEY ?? "";
const url= process.env.SUPABASE_URL ?? "";

const supabase = createClient(url, apiKey);
console.log();

export default supabase;