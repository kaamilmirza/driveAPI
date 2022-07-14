const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "658777272415-n5fd7l8t9pgjc9dclnhscinv2giddjfj.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04LsNJvmplwSyCgYIARAAGAQSNgF-L9IrVk5v6CUaX9yxXHFsRYoJu_t_xFYBALw64w2bGMoyHZiJpLkhrjoD07m-uTiwKUsWKA";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function searchFile() {
  const files = [];
  // const data= [];
  const filenames = {
    name: "",
    id:  "",
  }
  var obj = {
    data: []
  };
  var pageToken = null;

  var res = drive.files.list({
    q: "mimeType = 'application/vnd.google-apps.folder'",
    maxResults: 1000,
    pageSize: 1000,
    pageToken: pageToken,
  });
  pageToken = res.nextPageToken;
  while(pageToken!=null){
  try {
    res = await drive.files.list({
      // q: "mimeType='image/png'", //use this to filter using mimetypes
      q: "mimeType = 'application/vnd.google-apps.folder'",
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
      maxResults: 1000,
      pageSize: 1000,
    pageToken: pageToken,a
    });
    Array.prototype.push.apply(files, res.files);
    res.data.files.forEach(function (file) {
      filenames.name = file.name;
      filenames.id = file.id;
      // console.log(filenames);
      obj.data.push({name:file.name, id:file.id});
    });
    var json = JSON.stringify(obj);
    fs.writeFileSync("data.json", json, "utf8");
    // console.log(data);
    pageToken = res.nextPageToken;
    return res.data.files;
  } catch (err) {
    throw err;
  }
}
}
exports.searchFile = searchFile;
