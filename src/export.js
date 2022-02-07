import { storage } from "uxp";
import { app, core } from "photoshop";

import { showAlert } from "./utils";

export { executeExport };

async function executeExport(file, scaleFactor) {
    const fs = storage.localFileSystem;
    const saveFile = await fs.createSessionToken(file);
    const activeDoc = app.activeDocument;
    const background = activeDoc.layers.find(layer => layer.name === 'Background');

    if (!background || background.hidden) {
      showAlert("Please ensure your file contains a black background that is not hidden.");
    }
    const batchPlayAction = [
        {
          _obj: "hide",
          null: [
            {
              _name: "Background",
              _ref: "layer"
            }
          ]
        },
        {
          _obj: "selectAllLayers",
          _target: [
            {
              _enum: "ordinal",
              _ref: "layer"
            }
          ]
        },
        {
          _obj: "mergeVisible"
        },
        {
          _obj: "imageSize",
          constrainProportions: true,
          interfaceIconFrameDimmed: {
            _enum: "interpolationType",
            _value: "automaticInterpolation"
          },
          scaleStyles: true,
          width: {
            _unit: "percentUnit",
            _value: scaleFactor
          }
        },
        {
          _obj: "flip",
          _target: [
            {
              _enum: "ordinal",
              _ref: "document",
              _value: "first"
            }
          ],
          axis: {
            _enum: "orientation",
            _value: "vertical"
          }
        },
        {
          _obj: "set",
          _target: [
            {
              _property: "selection",
              _ref: "channel"
            }
          ],
          to: {
            _enum: "channel",
            _ref: "channel",
            _value: "transparencyEnum"
          }
        },
        {
          _obj: "duplicate",
          _target: [
            {
              _property: "selection",
              _ref: "channel"
            }
          ]
        },
        {
          _obj: "show",
          null: [
            {
              _name: "Background",
              _ref: "layer"
            }
          ]
        },
        {
          _obj: "save",
          as: {
            _obj: "targaFormat",
            bitDepth: 32,
            compression: 0
          },
          copy: true,
          documentID: app.activeDocument.id,
          in: {
            _kind: "local",
            _path: saveFile
          },
          lowerCase: true
        },
        {
            _obj: "show",
            null: [
              {
                _name: "Background",
                _ref: "layer"
              }
            ]
        }
      ];
    
    await core.executeAsModal(
        async () => {
            try {
                await app.batchPlay(batchPlayAction, {"historyStateInfo": {
                  "name": "Export TGA",
                  "target": [ {_ref: "document", _id: app.activeDocument.id}]
              }});
            } catch (e) {
                console.log(e);
                showAlert(`Error occured while exporting: ${e.message}`);
            }
        },
        { commandName: "Export as TGA" }
      );
  }