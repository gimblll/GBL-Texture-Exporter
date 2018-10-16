# GBL Texture Exporter

## Info

GBL Texture Exporter is a tool for exporting textures from Photoshop PSD files. 

Features:
- Create a batch of export items from top level layers or groups, single layer can be set to export
multiple times with different settings
- Relative export paths, root folder changeable through global settings
- Resize and trim control for each individual export item
- Apply custom action to the flattened export layer to do additional modifications
- Settings stored inside the PSD as XMP metadata, no extra files to keep track of
- Textures are exported as png or tga (format is deduced from export path filename)

Compatible with Photoshop CC 2019 and newer. Use older commit if you need earlier compatibility. This is because CC 2019 reintroduced missing scripting functionality that went missing from CC 2015 onwards, and the newest commit uses it again.

## Screenshot

![UI Screenshot](https://raw.githubusercontent.com/gimblll/GBL-Texture-Exporter/master/screenshot.png)

## Installing

Copy 'GBL Texture Exporter.jsx' file to Adobe/Photoshop CC (version)/Presets/Scripts/ folder, restart Photoshop and start the 
Exporter UI from menus through File/Scripts/GBL Texture Exporter. 
