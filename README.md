# Inkatlas Utils
This is a Photoshop plugin that assists in the creation of texture maps in Cyberpunk 2077.

[![image.png](https://i.imgur.com/N0enev3.png)](https://i.imgur.com/N0enev3.png)

## Prerequisites
- Adobe Photoshop 2022 
- Currently requires the latest nightly build of WolvenKit: https://github.com/WolvenKit/WolvenKit-nightly-releases/releases
- For testing purposes, the latest copy of Redscript must be installed (Optional)

## Installation
1. Download the latest `inkatlas-utils_PS.ccx` at https://github.com/deadlymustard/inkatlas-utils/releases.
2. Double click the downloaded `inkatlas-utils_PS.ccx` to add the Plugin to Photoshop.

## Usage
If you're creating a new texture map from scratch you will want to open Photoshop and create a new file. For the best results, ensure that a `Background` layer exists and is locked. This layer will be ignored in any processing done in the plugin.

From there, you can begin creating layers. Try to keep each individual texture in its own layer and *ensure the layer has an appropriate name* the name will be used to access your texture via Redscript.

When ready, you can then go to Plugins -> InkAtlas Utils and open the panel. See the features below for more usage guidelines.

## Features
### Fit Layers
Will automatically arrange each layer in your Photoshop document (`.psd`) into the bounds of the current document. As document size increases, there may be no valid solution for packing all layers into your document - you must increase the canvas/image size until all layers fit or potentially get cut off textures when generating the `.inkatlas` file. Credit to: https://github.com/jakesgordon/bin-packing for the bin-packing library.

* Texture Spacing
  * Determines how far apart each layer is spaced out. This spacing is factored into the packing algorithm described above.

### Export TGA
This converts the active Photoshop document (`.psd`) into a `.tga` file that can then be imported into WolvenKit as an `.xbm`. This feature handles ensuring that alpha channels are properly created and the image is oriented correctly. Once you've created this file you can import it into WolvenKit.

* Scale To
  * Scales down the image to the percentage specified in the input field. (e.g. if your image size is 4000x4000 a value of `25` will scale the exported `.tga` file down to 1000x1000)

### Generate InkAtlas
This generates an `.inkatlas` file that can be imported into WolvenKit. It works by looking up each of the layer bounds and calculating the UV coordinates for each slice/mapping. It is important that after this step is done, no positioning changes are made to the `.tga`/`.xbm` file generated above. If changes _are_ made, please ensure the `.inkatlas` file is regenerated to reflect the new positioning of your textures in the texture map. Note that since `.inkatlas` uses UV coordinates instead of pixels there is no need to re-generate the file if the size of the `.xbm` changes.

* InkAtlas Filename
  * Filename of the `.inkatlas` to generate. Should generally match the name you picked for your `.tga`/`.xbm` file from the previous step. *Do not* include the `.inkatlas` file extension in the input.
* XBM Depot Path
  * The path of the resource to apply your texture map to. If you've already imported the `.tga` file into WolvenKit - you should be able to find the corresponding `.xbm` file in the Project Explorer. (ex. `base\\gameplay\\gui\\common\\icons\\corporations.xbm` ).
* XBM Depot Path (1080p)
  * Same as above, but a smaller version of your texture. (ex. `base\\gameplay\\gui\\common\\icons\\corporations_1080p.xbm` ).

### Generate Sample Redscript Mod
This generates a Redscript mod that you can use to verify your work. Simply choose a location you'd like the mod created then drag the `TextureSampleMod` folder to your `Cyberpunk 2077\r6\scripts\` folder.

* InkAtlas Depot Path
  * The path of your `.inkatlas` resource after you have imported it into WolvenKit.
