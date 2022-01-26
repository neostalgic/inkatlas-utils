// Photoshop Dependencies
const app = require("photoshop").app;
const core = require("photoshop").core;

const fit = require("./fit");
const atlas = require("./atlas");

// Handle fitting layers together
async function fitLayers(spacing) {
  fit.fitLayersAndMove(app, core, spacing);
}

// Generate the atlas file and write
async function writeAtlasFile(fileName, depotPath, depotPath1080p) {
  try {
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDoc = app.activeDocument;
    const atlasJson = atlas.generateAtlasJson(activeDoc, depotPath, depotPath1080p);
    if (atlasJson) {
      await writeAtlasJsonToDisk(fileName, atlasJson);
    } else {
      showAlert("Could not get any layer names.");
    }
  } catch (err) {
    showAlert(`Error occurred getting layer names: ${err.message}`);
  }
}

// Open the OS panel for saving files and write
async function writeAtlasJsonToDisk(fileName, atlasJson) {
  const fs = require("uxp").storage.localFileSystem;
  const file = await fs.getFileForSaving(`${fileName}.inkatlas.json`, {
    types: ["json"],
  });
  if (!file) {
    // file picker was cancelled
    return;
  }
  const result = await file.write(JSON.stringify(atlasJson));
}

// Generic alerting in PS
async function showAlert(message) {
  const app = require("photoshop").app;
  await app.showAlert(message);
}


document.querySelector("#btnArrange").addEventListener("click", evt => {
  const textureSpacing = parseInt(document.querySelector("#textureSpacing").value);
  fitLayers(textureSpacing);
})

document.querySelector("#btnGenerate").addEventListener("click", evt => {
  const atlasFileName = document.querySelector("#atlasFileName").value;
  const depotPath = document.querySelector("#texturePath").value
  const depotPath1080p = document.querySelector("#texturePath1080p").value

  writeAtlasFile(atlasFileName, depotPath, depotPath1080p);
})
