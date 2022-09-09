const search = require('./searchFile.cjs');
const upload = require('./uploadFile.cjs');
const viewlink = require('./webViewLink.cjs');
const del = require('./deleteFile.cjs')
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('./uploadFile.cjs');
require('dotenv').config();

console.log(process.env.CLIENT_ID);


const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});
// search.searchFile(); //This will search for files in your drive
//  upload.uploadFile(); //This will upload a file to your drive
// viewlink.generatePublicUrl(); //This will generate a public link for a file
// del.deleteFile(); //This will delete a file from your drive
