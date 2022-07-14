const search = require('./searchFile.cjs');
const upload = require('./uploadFile.cjs');
const viewlink = require('./webViewLink.cjs');
const del = require('./deleteFile.cjs')
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('./uploadFile.cjs');

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

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});
search.searchFile(); //This will search for files in your drive
// upload.uploadFile(); //This will upload a file to your drive
// viewlink.generatePublicUrl(); //This will generate a public link for a file
// del.deleteFile(); //This will delete a file from your drive
