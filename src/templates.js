export { inkAtlasTemplate, blah };

const inkAtlasTemplate = function () {
  return JSON.parse(JSON.stringify(_inkAtlasTemplate));
};

const blah = function () {
  return JSON.parse(JSON.stringify(_atlasMappingTemplate));
};

const _inkAtlasTemplate = {
  WolvenKitVersion: "8.8.1",
  WKitJsonVersion: "0.0.3",
  ExportedDateTime: "2022-01-25T19:03:40.1193136Z",
  DataType: "CR2W",
  ArchiveFileName: "",
  Data: {
    Version: 195,
    BuildVersion: 0,
    RootChunk: {
      $type: "inkTextureAtlas",
      activeTexture: "StaticTexture",
      cookingPlatform: "PLATFORM_PC",
      dynamicTexture: {
        DepotPath: 0,
        Flags: "Default",
      },
      dynamicTextureSlot: {
        $type: "inkDynamicTextureSlot",
        parts: [],
        texture: {
          DepotPath: 0,
          Flags: "Default",
        },
        isSingleTextureMode: 1,
        parts: [],
        slices: [],
        slots: {
          Size: 3,
          Elements: [
            {
              $type: "inkTextureSlot",
              parts: [],
              slices: [],
              texture: {
                DepotPath: "",
                Flags: "Default",
              },
            },
            {
              $type: "inkTextureSlot",
              parts: [],
              slices: [],
              texture: {
                DepotPath: "",
                Flags: "Default",
              },
            },
            {
              $type: "inkTextureSlot",
              parts: [],
              slices: [],
              texture: {
                DepotPath: 0,
                Flags: "Default",
              },
            },
          ],
        },
        texture: {
          DepotPath: 0,
          Flags: "Default",
        },
        textureResolution: "UltraHD_3840_2160",
      },
    },
    EmbeddedFiles: [],
  },
};

const _atlasMappingTemplate = {
  $type: "inkTextureAtlasMapper",
  clippingRectInPixels: {
    $type: "Rect",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  clippingRectInUVCoords: {
    $type: "RectF",
  },
  partName: "",
};
