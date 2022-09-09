const se = require('./searchFile.cjs');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: prcoess.env.REFRESH_TOKEN });
filePath = path.join(__dirname, 'test1.png');
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'test1.png', //This can be name of your choice
          mimeType: 'image/png',
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(filePath),
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  exports.uploadFile = uploadFile;

