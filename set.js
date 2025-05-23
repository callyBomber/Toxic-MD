const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEVxS0h3bHZFVFJEWGl3K0VZcVplR3hWc2pGYUxiMk5GbituQ3NjMUNuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzIyTG9YUHJlTStodkVKUFFDdzBDVmdCcU1NWWJWOHIvR25hUVo3ZitWdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RkJ1dERsWmRSb2xVZ0J2c3Rwd2pKaGY3Rm9EanU2Z0VJSmN3TXVWU0hnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqU1VTRDVLYnExTENvS3JjN1BkQWpjMDlPcU53TjJ5OVdXSkVBWVRmb0QwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitOZHlIZFZzSENSWTZTczVzdWxibUpXSit3QzVsRDR6M09uUXJEbTQ3WFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdKTEkvaVFMaFNYTXdPazhlQnVHeEtOTWZpUGNZY1liS0EyTGhURU9seFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUNzRTdNd3pEZHEwQ2RWRkVaRTFwQzNUdGZtWVUwSlQ2ak82RkZoK1oxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUxrM0JKZnhoYW9pWTdXc2hSRXFoT3BCL1VEMGZmN1dlcEpWK1FpTFMxRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlA3ZmJ2THFnRm4xUmcyUHN3V1RCTy96eWI5a3B2ZnJSVHBZQmF5RTR6dGo0SnhrSzlWSEVkdzhlVnpFd2FvNnY3VkhXMW0xRGh5M2paVVNVWERjd0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJ4cG5iczVmRXFpdHdkT21vcWx5RlJ1czNpeW92dXU3a0Y0RXBXQmgrWHdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3Njg3Mzk0MjM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNDNERGREM1QzkzNjE2NUYxRDRBOUExRjQ3RjQ2QTg0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc5NTkwNzZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3Njg3Mzk0MjM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjgyMkFBQkI3MTgxMENEMDQ0RjIwRTZCNENENThCNzYyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc5NTkwNzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlhxUTFhbDZPU0UyM095V0dXRzlkRmciLCJwaG9uZUlkIjoiMzA4ODA5MGItZjE2My00NmMzLTgzZmUtMzRhOTZkNDU0YzFmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLWDBETWlIY1cyVDZMaWlBOUNRc1hEaEt0ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1QzNlRVRCWU5sZ1dBUHppRHZFMENaZEswYTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVE9YSUNURUMiLCJtZSI6eyJpZCI6IjI3Njg3Mzk0MjM3OjUyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTY4NTYwODkwNTAzNDE2OjUyQGxpZCIsIm5hbWUiOiI68J2WiPCdlo3wnZaG8J2WiSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzZtbjdrQkVKUDZ2c0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWGF4UFBXMnorcmptMStmNGFIU0RQVmUzd3VCeE5ERStpMnloVVpxRlN4TT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiR0Z3VzByOXNaZlpPd2MyY1NzSmVFY1BtUnFXWk1WbmlyNTdjWGM3d0htcDdYQlJSS0Q0UkF0TFVJUjNsZWdIaHd6bmRDaVVvSTQ1ejAweTdpUXNJQnc9PSIsImRldmljZVNpZ25hdHVyZSI6Imc4ZDVLSlZKZkREQWdldWhnbWFoNm84UDg5U3BmSlRVVVd2RUMzQ0FCM29vRHVrOEZ1V3V3SlgzSGlLeW01V2xTQVJZd2hqcDdFY0hDZGZJRzYvNENBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2ODczOTQyMzc6NTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVjJzVHoxdHMvcTQ1dGZuK0doMGd6MVh0OExnY1RReFBvdHNvVkdhaFVzVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3OTU5MDcyLCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo0ZCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "chad",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27687394237",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
