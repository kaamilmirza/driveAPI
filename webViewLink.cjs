const se = require('./searchFile.cjs');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '658777272415-n5fd7l8t9pgjc9dclnhscinv2giddjfj.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04LsNJvmplwSyCgYIARAAGAQSNgF-L9IrVk5v6CUaX9yxXHFsRYoJu_t_xFYBALw64w2bGMoyHZiJpLkhrjoD07m-uTiwKUsWKA';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
filePath = path.join(__dirname, 'test1.png');
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});
async function generatePublicUrl() {
      try {
        const fileId = '1_O6vVgvALYfJme7UKpVduECka8pf8M1w';
        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });
    
        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
          fileId: fileId,
          fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
      } catch (error) {
        console.log(error.message);
      }
    }
exports.generatePublicUrl = generatePublicUrl;