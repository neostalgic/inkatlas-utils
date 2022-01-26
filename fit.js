const { packer } = require("./dist/packer");

module.exports = { fitLayersAndMove };


async function fitLayersAndMove(app, core, spacing) {
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
    
    executeLayerMove(core, layerMap, layerBlocks);
  }

  async function executeLayerMove(core, layerMap, layerBlocks) {
    await core.executeAsModal(
        async () => {
          for (let layerBlock of layerBlocks) {
            let layer = layerMap.get(layerBlock.id);
    
            const currentX = layer.bounds.left;
            const currentY = layer.bounds.top;
            const desiredX = layerBlock.fit.x;
            const desiredY = layerBlock.fit.y;
            const translateX = desiredX - currentX;
            const translateY = desiredY - currentY;
    
            await app.batchPlay([
              {
                _obj: "select",
                _target: [{ _name: layerBlock.id, _ref: "layer" }],
                layerID: [32],
                makeVisible: false,
              },
              {
                _obj: "move",
                _target: [{ _enum: "ordinal", _ref: "layer" }],
                to: {
                  _obj: "offset",
                  horizontal: { _unit: "pixelsUnit", _value: translateX },
                  vertical: { _unit: "pixelsUnit", _value: translateY },
                },
              },
            ]);
          }
        },
        { commandName: "Fit Layers" }
      );
  }