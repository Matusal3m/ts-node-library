"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
const apiKey = (_a = process.env.SUPABASE_KEY) !== null && _a !== void 0 ? _a : "";
const url = (_b = process.env.SUPABASE_URL) !== null && _b !== void 0 ? _b : "";
const supabase = (0, supabase_js_1.createClient)(url, apiKey);
exports.default = supabase;
