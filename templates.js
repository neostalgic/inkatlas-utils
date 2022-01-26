const inkAtlasTemplate = function () {
  return JSON.parse(JSON.stringify(_inkAtlasTemplate));
};

const atlasMappingTemplate = function () {
  return JSON.parse(JSON.stringify(_atlasMappingTemplate));
};

module.exports = { inkAtlasTemplate, atlasMappingTemplate };

const _inkAtlasTemplate = {
  WolvenKitVersion: "8.5.0",
  WKitJsonVersion: "0.0.1",
  ExportedDateTime: "2022-01-25T19:03:40.1193136Z",
  ArchiveFileName: "",
  Data: {
    RootChunk: {
      Type: "inkTextureAtlas",
      Id: "1",
      Properties: {
        activeTexture: "StaticTexture",
        cookingPlatform: "PLATFORM_PC",
        dynamicTexture: {
          DepotPath: null,
          Flags: "Default",
        },
        dynamicTextureSlot: {
          Type: "inkDynamicTextureSlot",
          Id: "2",
          Properties: {
            parts: [],
            texture: {
              DepotPath: null,
              Flags: "Default",
            },
          },
        },
        isSingleTextureMode: 1,
        parts: [],
        slices: [],
        slots: {
          Size: 3,
          Elements: [
            {
              Type: "inkTextureSlot",
              Id: "3",
              Properties: {
                parts: [],
                slices: [],
                texture: {
                  DepotPath: "",
                  Flags: "Default",
                },
              },
            },
            {
              Type: "inkTextureSlot",
              Id: "7",
              Properties: {
                parts: [],
                slices: [],
                texture: {
                  DepotPath: "",
                  Flags: "Default",
                },
              },
            },
            {
              Type: "inkTextureSlot",
              Id: "11",
              Properties: {
                parts: [],
                slices: [],
                texture: {
                  DepotPath: null,
                  Flags: "Default",
                },
              },
            },
          ],
        },
        texture: {
          DepotPath: null,
          Flags: "Default",
        },
        textureResolution: "UltraHD_3840_2160",
      },
    },
    EmbeddedFiles: [],
  },
};

const _atlasMappingTemplate = {
  Type: "inkTextureAtlasMapper",
  Properties: {
    clippingRectInPixels: {
      Type: "Rect",
      Properties: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    },
    clippingRectInUVCoords: {
      Type: "RectF"
    }
  },
};
