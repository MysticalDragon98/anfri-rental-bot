import { config } from "dotenv";
import { ok } from "assert";

config();

 ok(process.env.PUBLIC_KEY, 'Missing required environment variable: PUBLIC_KEY'); 
export const $PUBLIC_KEY = process.env.PUBLIC_KEY;
