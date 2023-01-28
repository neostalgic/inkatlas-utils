import { slugify, generateVarName } from "./utils";

export { generateRedscriptFile };

function generateRedscriptFile(
  existingRedscriptFile,
  activeDoc,
  depotPath,
  scalingFactor
) {
  const allLayers = activeDoc.layers.filter(
    (layer) => layer.name !== "Background"
  );
  let maxTexturesInColumn = 7;
  let columnNumber = maxTexturesInColumn;
  let rowNumber = 0;
  const redscriptImages = allLayers
    .map((layer) => {
      let code = "";
      if (columnNumber == maxTexturesInColumn) {
        rowNumber++;
        code += generateNewRow(rowNumber);
        columnNumber = 0;
      }
      code += generateRedscriptForlayer(
        layer,
        depotPath,
        scalingFactor,
        rowNumber
      );

      columnNumber++;
      return code;
    })
    .join("\n");
  return existingRedscriptFile.replace("//ReplaceMe//", redscriptImages);
}

function generateNewRow(columnNumber) {
  return `
        let textures_${columnNumber}: ref<inkHorizontalPanel> = new inkHorizontalPanel();
        textures_${columnNumber}.Reparent(rows);
    `;
}

function generateRedscriptForlayer(layer, depotPath, scalingFactor, rowNumber) {
  const varName = `image${generateVarName(layer.name)}`;
  const scaledWidth = layer.bounds.width * (scalingFactor / 100);
  const scaledHeight = layer.bounds.height * (scalingFactor / 100);
  const cName = `n"${slugify(layer.name)}"`;

  const redscriptForLayer = `
        let ${varName}: ref<inkImage> = new inkImage();
        ${varName}.SetAtlasResource(r"${depotPath}");
        ${varName}.SetTexturePart(${cName});
        ${varName}.SetNineSliceScale(true);
        ${varName}.SetMargin(new inkMargin(8.0, 8.0, 8.0, 8.0));
        ${varName}.SetHAlign(inkEHorizontalAlign.Left);
        ${varName}.SetVAlign(inkEVerticalAlign.Center);
        ${varName}.SetAnchorPoint(new Vector2(0.5, 0.5));
        ${varName}.SetOpacity(0.5);
        ${varName}.SetSize(new Vector2(${scaledWidth}, ${scaledHeight}));
        ${varName}.SetTintColor(new HDRColor(1.3698, 0.4437, 0.4049, 1.0));
        ${varName}.Reparent(textures_${rowNumber});
    `;

  return redscriptForLayer;
}
