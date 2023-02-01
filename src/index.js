import { app } from "photoshop";
import { storage } from "uxp";

import { generateAtlasJson } from "./atlas";
import { executeExport } from "./export";
import { fitLayersAndMove } from "./fit";
import { generateRedscriptFile } from "./redscript";
import { showAlert } from "./utils";

// Handle fitting layers together
async function fitLayers(spacing) {
  fitLayersAndMove(spacing);
}

async function writeTgaFile(scaleFactor, flipImage) {
  const fs = storage.localFileSystem;
  const file = await fs.getFileForSaving("output", {
    types: ["tga"],
  });
  if (!file) {
    // file picker was cancelled
    return;
  }
  executeExport(file, scaleFactor, flipImage);
}

// Generate the atlas file and write
async function writeAtlasFile(fileName, depotPath, depotPath1080p) {
  try {
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDoc = app.activeDocument;
    const atlasJson = generateAtlasJson(activeDoc, depotPath, depotPath1080p);
    if (atlasJson) {
      await writeAtlasJsonToDisk(fileName, atlasJson);
    } else {
      showAlert("Could not get any layer names.");
    }
  } catch (err) {
    showAlert(`Error occurred getting layer names: ${err.message}`);
  }
}

// Stringify atlas file and write
async function writeAtlasJsonToDisk(fileName, atlasJson) {
  const atlasFileName = `${fileName}.inkatlas.json`;
  const jsonPayload = JSON.stringify(atlasJson);
  await writeFile(atlasFileName, "json", jsonPayload);
}

// Generate sample redscript and write to disk
async function writeRedscriptSampleFile(depotPath, scalingFactor) {
  const fs = storage.localFileSystem;

  try {
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDoc = app.activeDocument;
    const existingRedscriptFile = await getExistingRedscriptFile();
    const existingRedscriptFileContents = await existingRedscriptFile.read();
    const generatedRedscript = generateRedscriptFile(
      existingRedscriptFileContents,
      activeDoc,
      depotPath,
      scalingFactor
    );
    if (generatedRedscript) {
      const pluginDataFolder = await fs.getPluginFolder();
      const folder = await fs.getFolder();
      const existingModFolder = await pluginDataFolder.getEntry(
        "resources/TextureSampleMod"
      );
      await copyFolderRecursively(existingModFolder, folder);

      const coreModDirectory = await folder.getEntry(
        "TextureSampleMod/SampleMod"
      );
      const redscriptFile = await coreModDirectory.createFile("Textures.reds", {
        overwrite: true,
      });
      await redscriptFile.write(generatedRedscript);
    } else {
      showAlert("Could not generate Redscript mod files.");
    }
  } catch (err) {
    showAlert(`Error occurred getting layer names: ${err.message}`);
  }
}

async function copyFolderRecursively(entry, destination) {
  if (entry.isFolder) {
    let childFolder;
    try {
      childFolder = await destination.getEntry(entry.name);
    } catch (e) {
      childFolder = await destination.createFolder(entry.name);
    }
    const entries = await entry.getEntries();
    for (const childEntry of entries) {
      await copyFolderRecursively(childEntry, childFolder);
    }
  } else {
    await entry.copyTo(destination, { overwrite: true });
  }
}

async function getExistingRedscriptFile() {
  const fs = storage.localFileSystem;
  const pluginDataFolder = await fs.getPluginFolder();
  const templatesFolder = await pluginDataFolder.getEntry(
    "resources/templates"
  );
  return await templatesFolder.getEntry("Textures.reds");
}

// Open the OS panel for saving files and write
async function writeFile(fileName, fileType, payload) {
  const fs = storage.localFileSystem;
  const file = await fs.getFileForSaving(fileName, {
    types: [fileType],
  });
  if (!file) {
    // file picker was cancelled
    return;
  }
  const result = await file.write(payload);
}

function escapeSlashes(path) {
  return path.replace(/(?<!\\)\\(?!\\)/g, "\\\\");
}

document.querySelector("#btnArrange").addEventListener("click", (evt) => {
  evt.stopPropagation();
  const textureSpacing = parseInt(
    document.querySelector("#textureSpacing").value
  );
  fitLayers(textureSpacing);
  evt.stopImmediatePropagation();
});

document.querySelector("#btnGenerate").addEventListener("click", (evt) => {
  evt.stopPropagation();
  const atlasFileName = document.querySelector("#atlasFileName").value;
  const depotPath = document.querySelector("#texturePath").value;
  const depotPath1080p = document.querySelector("#texturePath1080p").value;

  writeAtlasFile(atlasFileName, depotPath, depotPath1080p);
  evt.stopImmediatePropagation();
});

document.querySelector("#btnRedscript").addEventListener("click", (evt) => {
  evt.stopPropagation();
  const depotPath = escapeSlashes(
    document.querySelector("#redscriptTexturePath").value
  );
  const scalingFactor = document.querySelector("#redscriptIconScale").value;
  console.log(depotPath);
  writeRedscriptSampleFile(depotPath, scalingFactor);
  evt.stopImmediatePropagation();
});

document.querySelector("#btnExport").addEventListener("click", (evt) => {
  const scaleFactor = parseFloat(document.querySelector("#scaleFactor").value);
  const flipImage = document.querySelector("#flipImage").checked;
  writeTgaFile(scaleFactor, flipImage);
  evt.stopImmediatePropagation();
});

document.querySelectorAll("sp-textfield").forEach((item) => {
  item.addEventListener("paste", (evt) => {
    let paste = (evt.clipboardData || window.clipboardData).getData("text");
    let escaped = escapeSlashes(paste);
    item.value = escaped;
    evt.stopImmediatePropagation();
  });
});
