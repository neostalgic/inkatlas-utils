import { storage } from "uxp";
import { app, core } from "photoshop";

export { executeExport };

async function executeExport(file, scaleFactor) {
    const fs = storage.localFileSystem;
    const saveFile = await fs.createSessionToken(file);
    console.log(saveFile);

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
            _obj: "select",
            _target: [
              {
                _offset: -5,
                _ref: "historyState"
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
        }
      ];

      console.log(batchPlayAction);
    
    await core.executeAsModal(
        async () => {
            try {
                const blah = await app.batchPlay(batchPlayAction);
            } catch (e) {
                console.log(e);
            }
        },
        { commandName: "Export as TGA" }
      );
  }