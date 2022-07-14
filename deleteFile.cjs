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
async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: '1Qgc1NahQD-11mozEudr7nHc9cKwcmKyB',
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}
exports.deleteFile = deleteFile;