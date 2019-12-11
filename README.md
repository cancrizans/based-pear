# based-pear

[Online Here](https://cancrizans.github.io/based-pear/)

This is an interactive 3D colour picker / palette builder, based on Fletcherian colour theory. Still very much in the works.

## Details

Colours are represented by little boxes ("Nodes") in 3d space, using a specialised coordinate chart we can call "FCL":

* Vertical position is Luminance (L). It is an objective measure of perceived brightness. It goes from black (L=0) at the bottom, to middle grey (L=50) on the horizontal plane through the origin, to white (L=100) at the top.
* Distance from the vertical axis is Chroma (C). It is an objective measure of colourfulness. At C=0 on the axis we have greys, as you get farther out colours get more vibrant and saturated. Chroma generally stays under 100 but depending on the hue and luminance the maximum value of chroma varies considerably.
* Angle around the vertical axis is Fletcherian Hue (F). This is a value from 0 to 12 which corresponds to the "tones" of the Fletcherian system


0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10| 11| 12
--|---|---|---|---|---|---|---|---|---|---|---|---
RO| O | OY| Y | YG| G | BG| B | BV| V | VR| R | RO

This coordinate is convenient for artists as it encodes information relevant to hue harmony. To say it as compactly as possible, the harmonic relationship between two colours depends only on the difference in F.

Some values of FCL do not correspond to colours in the RGB gamut, which are colours representable by a digital display. (They might correspond to real colours not in the RGB gamut, or they might simply be impossible at all). This is enforced as the applet will prevent you from even dragging colours outside and will clamp them to stay on the walls of the gamut. 

The gamut is a really weird shape, especially in FCL coordinates, so I don't have much to say except explore it and try to feel it around.

## Instructions

By right clicking on the background and dragging you can rotate the view. With the mouse wheel you can zoom in an out.

With the `Q` key you can switch between Perspective and Orthographic camera. Orthographic is especially useful. Orthographic from above reproduces a standard "luma-ignorant" colour wheel.

With the `N` key you add a node.

You can then drag nodes around to change the colour. The colour will always be forced to stay within gamut, but it will try to keep as big a chrominance as possible.

By holding the `Y` key while dragging, you can lock a node's chromaticity and change only the luminance, i.e. only move it vertically.

Similarly, by holding `T` while dragging instead, you lock a node's hue. So you only change chroma and luminance.

With the little x in the top right of a node's entry in the inspector you can delete a node. You cannot delete the first node, which is the neutral point / background.


