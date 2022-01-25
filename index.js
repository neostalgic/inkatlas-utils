// Photoshop UXP Sample
// Get the layer names from the active document, and write them to a file.
// Shows how to access layers, and how to prompt the user for a filepath.

  const { entrypoints } = require("uxp");
// Set up entry points -- this defines the handler for menu items
// If this plugin had a panel, we would define flyout menu items here
entrypoints.setup({
  commands: {
    'generate-uv-bounds': () => writeAtlasMappings()
    // if we had other menu items, they would go here and in the manifest.json file.
  }
});

async function writeAtlasMappings() {
  try {
    const app = require("photoshop").app;
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDoc = app.activeDocument;

    const atlasMappings = generateAtlasMappings(activeDoc);
    if (atlasMappings) {
      await writeAtlasMappingsToDisk(activeDoc.title, atlasMappings);
    }
    else {
      showAlert("Could not get any layer names.");
    }
  }
  catch(err) {
    showAlert(`Error occurred getting layer names: ${err.message}`);
  }
}

function generateAtlasMappings(activeDoc) {
    const allLayers = activeDoc.layers;
    return allLayers.map(layer => generateAtlasMappingForLayer(activeDoc, layer));
}

function generateAtlasMappingForLayer(activeDoc, layer) {

  const height = activeDoc.height;
  const width = activeDoc.width;

  return {
    Type: "inkTextureAtlasMapper",
    Properties: {
      clippingRectInPixels: {
        Type: "Rect",
        Properties: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }
      },
      clippingRectInUVCoords: {
        Type: "RectF",
        Properties: {
          Bottom: layer.bounds.bottom / height,
          Left: layer.bounds.left / width,
          Right: layer.bounds.right / width,
          Top: layer.bounds.top / height
        }
      },
      partName: slugify(layer.name)
    }
  }
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

async function writeAtlasMappingsToDisk(activeDocName, atlasMappings) {
  const fs = require("uxp").storage.localFileSystem;
  const file = await fs.getFileForSaving(`${activeDocName}_output.json`, { types: [ "json" ]});
  if (!file) {
    // file picker was cancelled
    return;
  }
  const result = await file.write(JSON.stringify(atlasMappings));
}

async function showAlert(message) {
  const app = require('photoshop').app;
  await app.showAlert(message);
}