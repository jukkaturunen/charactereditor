const DATA_FOLDER_ID = '1g9ZUn6XAlh0Z9JtCFxVPepxTq_Q2B5v5';

function doGet() {
  console.log('doGet() called');
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getCharacterFiles() {
  try {
    console.log('getCharacterFiles() called with folder ID:', DATA_FOLDER_ID);

    const folder = DriveApp.getFolderById(DATA_FOLDER_ID);
    console.log('Folder found:', folder.getName());

    const files = folder.getFiles();
    console.log('Got files iterator for all files');

    const characterFiles = [];

    let fileCount = 0;
    while (files.hasNext()) {
      const file = files.next();
      fileCount++;
      console.log(`File ${fileCount}: ${file.getName()}, type: ${file.getBlob().getContentType()}`);

      if (file.getName().endsWith('.json')) {
        console.log('Adding JSON file to list:', file.getName());
        characterFiles.push({
          id: file.getId(),
          name: file.getName()
        });
      }
    }

    console.log('Total files checked:', fileCount);
    console.log('JSON files found:', characterFiles.length);

    // Sort by name
    characterFiles.sort((a, b) => a.name.localeCompare(b.name));

    console.log('Returning character files:', characterFiles);
    return characterFiles;
  } catch (error) {
    console.error('Error getting character files:', error.toString());
    Logger.log('Error getting character files: ' + error.toString());
    throw new Error('Failed to load character files: ' + error.toString());
  }
}

function loadCharacter(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const content = file.getBlob().getDataAsString();

    // Validate JSON
    try {
      JSON.parse(content);
    } catch (parseError) {
      return {
        success: false,
        error: 'Invalid JSON in character file'
      };
    }

    return {
      success: true,
      data: content
    };
  } catch (error) {
    Logger.log('Error loading character: ' + error.toString());
    return {
      success: false,
      error: 'Failed to load character: ' + error.toString()
    };
  }
}

function saveCharacter(fileId, characterData) {
  try {
    // Validate JSON
    try {
      JSON.parse(characterData);
    } catch (parseError) {
      return {
        success: false,
        error: 'Invalid JSON data'
      };
    }

    const file = DriveApp.getFileById(fileId);
    const blob = Utilities.newBlob(characterData, 'application/json');
    file.setContent(blob.getDataAsString());

    return {
      success: true
    };
  } catch (error) {
    Logger.log('Error saving character: ' + error.toString());
    return {
      success: false,
      error: 'Failed to save character: ' + error.toString()
    };
  }
}

function createNewCharacter(characterName, characterData) {
  try {
    // Validate JSON
    try {
      JSON.parse(characterData);
    } catch (parseError) {
      return {
        success: false,
        error: 'Invalid JSON data'
      };
    }

    const folder = DriveApp.getFolderById(DATA_FOLDER_ID);
    const fileName = characterName + '.json';

    // Check if file already exists
    const existingFiles = folder.getFilesByName(fileName);
    if (existingFiles.hasNext()) {
      return {
        success: false,
        error: 'A character with this name already exists'
      };
    }

    const blob = Utilities.newBlob(characterData, 'application/json', fileName);
    const newFile = folder.createFile(blob);

    return {
      success: true,
      fileId: newFile.getId()
    };
  } catch (error) {
    Logger.log('Error creating character: ' + error.toString());
    return {
      success: false,
      error: 'Failed to create character: ' + error.toString()
    };
  }
}

function deleteCharacter(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    file.setTrashed(true);

    return {
      success: true
    };
  } catch (error) {
    Logger.log('Error deleting character: ' + error.toString());
    return {
      success: false,
      error: 'Failed to delete character: ' + error.toString()
    };
  }
}

// Utility function to get folder contents for debugging
function debugGetFolderContents() {
  try {
    const folder = DriveApp.getFolderById(DATA_FOLDER_ID);
    const files = folder.getFiles();
    const contents = [];

    while (files.hasNext()) {
      const file = files.next();
      contents.push({
        name: file.getName(),
        id: file.getId(),
        mimeType: file.getBlob().getContentType(),
        size: file.getSize()
      });
    }

    Logger.log('Folder contents: ' + JSON.stringify(contents, null, 2));
    return contents;
  } catch (error) {
    Logger.log('Error getting folder contents: ' + error.toString());
    throw error;
  }
}