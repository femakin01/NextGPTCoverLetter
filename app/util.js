
const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_Seceret_Key_API;
export const openai = new OpenAI(OPENAI_API_KEY);
