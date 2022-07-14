 // The folder ID (everything after the 'folders/' portion of the URL).
 var cacheOutputs = 'InventoryScript_outputs';
 var cacheKillFlag = 'InventoryScript_killFlag';
 
var searchDepthMax = 100; // Max depth for recursive search of files and folders
var listFiles = true; // flag for listing files
var cacheTimeout = 24 * 60 * 60 * 1000; // set cache time-out
var lockWaitTime = 1 * 60 * 1000; // set maximium watiting time for the cache lock
var appendToSheet = false; // flag for appending to selected spreadsheet
var writeBatchSize = 100; // the write batch size

var folderId = "1lEbcWHm-PVdGCExilUaCXPcViawfTUoe";

// Main function 1: List all folders, & write into the current sheet.
function listFolders(){
  getFolderTree(folderId, false);
};

// Main function 2: List all files & folders, & write into the current sheet.
function listAll(){
  getFolderTree(folderId, true); 
};

// =================
// Get Folder Tree
function getFolderTree(folderId, listAll) {
  try {
    // If you want to search from the top (root) folder
    var parentFolder = DriveApp.getRootFolder();

    // If you want a tree of any sub folder
    //var parentFolder = DriveApp.getFolderById(folderId);

    // Initialise the sheet
    var file, data, sheet = SpreadsheetApp.getActiveSheet();
    sheet.clear();
    sheet.appendRow(["Full Path", "Name", "Date", "URL", "Last Updated", "Description", "Size"]);

    // Get files and folders
    getChildFolders(parentFolder.getName(), parentFolder, data, sheet, listAll);

  } catch (e) {
    Logger.log(e.toString());
  }
};

// Get the list of files and folders and their metadata in recursive mode
function getChildFolders(parentName, parent, data, sheet, listAll) {
  var childFolders = parent.getFolders();

  // List folders inside the folder
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    // Logger.log("Folder Name: " + childFolder.getName());
    data = [ 
      parentName + "/" + childFolder.getName(),
      childFolder.getName(),
      childFolder.getWebViewLink(),
      childFolder.getDateCreated(),
      childFolder.getUrl(),
      childFolder.getLastUpdated(),
      childFolder.getDescription(),
      childFolder.getSize()
    ];
    // Write
    sheet.appendRow(data);

    // List files inside the folder
    var files = childFolder.getFiles();
    while (listAll & files.hasNext()) {
      var childFile = files.next();
      // Logger.log("File Name: " + childFile.getName());
      data = [ 
        parentName + "/" + childFolder.getName() + "/" + childFile.getName(),
        childFile.getName(),
        childFile.getWebViewLink(),
      ];
      // Write
      sheet.appendRow(data);
    }

    // Recursive call of the subfolder
    getChildFolders(parentName + "/" + childFolder.getName(), childFolder, data, sheet, listAll);  
  }
};
listFolders();