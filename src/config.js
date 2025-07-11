import dotenv from "dotenv";
dotenv.config();

const config = {

  mongoUrl: process.env.MONGODB_URI || '',
  mongoOptions: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },

  botName: process.env.BOT_NAME || "Aeonify",
  ownerNumber: process.env.OWNER_NUMBERS ? process.env.OWNER_NUMBERS.split(",") : ['916297175943'],
  ownerName: process.env.OWNER_NAME || "Aeon",
  prefix: process.env.PREFIX || "!",

  sessionId: process.env.SESSION_ID || "",
  auth: "qr",
  PORT: process.env.PORT || 3000,

  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY || "8bc2f9d5ae85d87a5daa6cbdfb60092f",
  apiBaseUrl: process.env.API_BASE_URL || "https://aeonsan.xyz/api",

  ownerGithubUrl: "https://github.com/Aeon-San",
  githubUrl: "https://github.com/Aeon-San/Aeonify",

  defaultCooldown: 2000,
  allowSelfCommand: true,
  cooldownBypassForOwner: true,

};

export default config;