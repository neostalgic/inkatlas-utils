# Inkatlas Utils
This is a photoshop plugin that assists in the creation of texture maps in Cyberpunk. Users can keep track of each icon/texture in a seperate named layer and automatically generate an `.inkatlas` file from it. Additionally, a "fitting" feature which automatically moves layers to optimize space in the texture map is available. After the icons/textures have been fitted, `.inkatlas` mappings can be generated off of them. Since these mappings use UV coordinates, the file can then be upscaled/downscaled so long as the aspect ratio is maintained. 

The texture mapping output may look something like this:
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

1. First, arrange each texture in a seperate layer in Photoshop and position them exactly how you'd like the texture map to be setup in the game.
2. Next, give each layer a name - the layer name will be used to generate the `partName` which can then subsequently be accesed in the game via a CNAME. 
Ex. (In Redscript)
```swift
image.SetAtlasResource(r"\\base\\gameplay\\gui\\common\\icons\\<yourInkAtlasName>.inkatlas");
image.SetTexturePart(n"aoba");
```
3. Open the Plugins panel in Photoshop by going to Plugins -> Plugins Panel
4. Open the Inkatlas Util plugin
5. First run the "Fit Layers" function to automatically fit the layers efficiently
6. Next, run the "Generate InkAtlas" to generate the atlas mappings.
7. The generated `.inkatlas` file will be in the same directory as the `.psd` file you were working with.
8. You should now be able to import the generated `.inkatlas` file in Wolvenkit.
