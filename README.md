# Inkatlas UV Bounds Generator

This plugin generates the `parts` array required to create inkAtlas files in Wolvenkit. Rather than manually calculating the bounds of each icon on an inkAtlas sheet, this plugin will do so using layers in Photoshop. 

The output may look something like this:
```json
[
  {
    "Type": "inkTextureAtlasMapper",
    "Properties": {
      "clippingRectInPixels": {
        "Type": "Rect",
        "Properties": { "bottom": 0, "left": 0, "right": 0, "top": 0 }
      },
      "clippingRectInUVCoords": {
        "Type": "RectF",
        "Properties": {
          "Bottom": 0.14697265625,
          "Left": 0.001953125,
          "Right": 0.11181640625,
          "Top": 0.0009765625
        }
      },
      "partName": "aoba"
    }
  },
  {
    "Type": "inkTextureAtlasMapper",
    "Properties": {
      "clippingRectInPixels": {
        "Type": "Rect",
        "Properties": { "bottom": 0, "left": 0, "right": 0, "top": 0 }
      },
      "clippingRectInUVCoords": {
        "Type": "RectF",
        "Properties": {
          "Bottom": 0.148193359375,
          "Left": 0.11376953125,
          "Right": 0.221435546875,
          "Top": 0.001953125
        }
      },
      "partName": "aoba-alt"
    }
  }
]
```

## Usage

1. First, arrange each icon in a seperate layer in Photoshop and position them exactly how you'd like the texture map to be setup in the game.
2. Next, give each layer a name - the layer name will be used to generate the `partName` which can then subsequently be accesed in the game via a CNAME. 
Ex. (In Redscript)
```swift
image.SetAtlasResource(r"\\base\\gameplay\\gui\\common\\icons\\<yourInkAtlasName>.inkatlas");
image.SetTexturePart(n"aoba");
```
3. Open the Plugins panel in Photoshop by going to Plugins -> Plugins Panel
4. Run InkAtlas UV Bounds Generator
5. Choose a destination to save the output JSON file to
6. You can then copy and paste the resulting array into the `parts` array into the `.inkatlas` you exported from Wolvenkit.
