const packer = require("../lib/packer");
import { app, core } from "photoshop";
import { showAlert } from "./utils";

export { fitLayersAndMove };

async function fitLayersAndMove(spacing) {
    await sortByHeight();
    const activeDoc = app.activeDocument;
    const height = activeDoc.height;
    const width = activeDoc.width;

    let layerMap = new Map(activeDoc.layers.map((layer) => [layer.name, layer]));
  
    let layerBlocks = Array.from(layerMap)
      .filter(([key, value]) => {
        return value.visible === true && value.locked === false;
      })
      .map(([key, value]) => {
        return { w: value.bounds.width + spacing, h: value.bounds.height + spacing, id: value.name };
      });
  

    var packer = new Packer(width, height);
    packer.fit(layerBlocks);

    executeLayerMove(layerMap, layerBlocks);
  }

  async function executeLayerMove(layerMap, layerBlocks) {
    const fittedBlocks = layerBlocks.filter(block => !!block.fit);
    const notFittedBlocks = layerBlocks
      .filter(block => !block.fit && block.id !== 'Background')
      .map(block => block.id);

    let batchPlayCommand = [];
    for (let layerBlock of fittedBlocks) {
      let layer = layerMap.get(layerBlock.id);
    
      const currentX = layer.bounds.left;
      const currentY = layer.bounds.top;
      const desiredX = layerBlock.fit.x;
      const desiredY = layerBlock.fit.y;
      const translateX = desiredX - currentX;
      const translateY = desiredY - currentY;

      const selectLayer = {
        _obj: "select",
        _target: [{ _name: layerBlock.id, _ref: "layer" }],
        layerID: [32],
        makeVisible: false,
      };

      const moveLayer = {
        _obj: "move",
        _target: [{ _enum: "ordinal", _ref: "layer" }],
        to: {
          _obj: "offset",
          horizontal: { _unit: "pixelsUnit", _value: translateX },
          vertical: { _unit: "pixelsUnit", _value: translateY },
        },
      };

      batchPlayCommand.push(...[selectLayer, moveLayer]);
    }

    await core.executeAsModal(async() => {
      try {
        await app.batchPlay(
          batchPlayCommand,
          { "historyStateInfo": {
            "name": "Fit Layers",
            "target": [ {_ref: "document", _id: app.activeDocument.id}]
          }}
        )
      } catch (e) {
        console.log(e);
      }
    }, { commandName: "Sort Layers" });

    if (notFittedBlocks.length > 0) {
      showAlert(`Could not fit layers: ${notFittedBlocks}`);
    }
  }

  async function sortByHeight() {
    const activeDoc = app.activeDocument;
    let sortedLayers = activeDoc.layers
    .filter(layer => layer.name !== "Background")
    .sort((layerA, layerB) => {
      return layerA.bounds.height - layerB.bounds.height;
    });
    
    let batchPlayCommand = [];
  
    for (let layer of sortedLayers) {
      const selectLayer = {
        "_obj": "select",
        "_target": [
            {
              "_ref": "layer",
              "_name": `${layer.name}`
            }
        ],
        "makeVisible": false,
        "layerID": [
          `${layer.id}`
        ]
      };
     const bringLayerToFront = {
        "_obj": "move",
        "_target": [
          {
              "_ref": "layer",
              "_enum": "ordinal",
              "_value": "targetEnum"
          }
        ],
        "to": {
          "_ref": "layer",
          "_enum": "ordinal",
          "_value": "front"
        }
      }
      batchPlayCommand.push(...[selectLayer, bringLayerToFront]);
    }
  
    await core.executeAsModal(async() => {
      try {
        await app.batchPlay(
          batchPlayCommand,
          {"historyStateInfo": {
            "name": "Sort Layers By Height",
            "target": [ {_ref: "document", _id: app.activeDocument.id}]
          }}
        )
      } catch (e) {
        console.log(e);
      }
    }, { commandName: "Sort Layers" });
  }