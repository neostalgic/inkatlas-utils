import { inkAtlasTemplate, blah } from "./templates";
import { slugify } from "./utils";

export { generateAtlasJson };

function generateAtlasJson(activeDoc, depotPath, depotPath1080p) {
  const atlasTemplate = inkAtlasTemplate();
  const atlasMappings = generateAtlasMappings(activeDoc);

  atlasTemplate.Data.RootChunk.slots.Elements[0].texture.DepotPath = depotPath;
  atlasTemplate.Data.RootChunk.slots.Elements[1].texture.DepotPath =
    depotPath1080p;

  atlasTemplate.Data.RootChunk.slots.Elements[0].parts = atlasMappings;
  atlasTemplate.Data.RootChunk.slots.Elements[1].parts = atlasMappings;

  return atlasTemplate;
}

function generateAtlasMappings(activeDoc) {
  const allLayers = activeDoc.layers;
  return allLayers
  .filter(layer => layer.name !== 'Background')
  .map((layer) =>
    generateAtlasMappingForLayer(activeDoc, layer)
  );
}

function generateAtlasMappingForLayer(activeDoc, layer) {
  const height = activeDoc.height;
  const width = activeDoc.width;

  const atlasMappingTemplate = blah();
  const uv = atlasMappingTemplate.clippingRectInUVCoords;
  
  uv.Bottom = layer.bounds.bottom / height;
  uv.Left = layer.bounds.left / width;
  uv.Right = layer.bounds.right / width;
  uv.Top = layer.bounds.top / height;

  atlasMappingTemplate.partName = slugify(layer.name);

  return atlasMappingTemplate;
}
