const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

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
