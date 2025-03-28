# Filament Materials Guide

# Overview

Filament is a physically based rendering (PBR) engine for Android. Filament offers a customizable material system that you can use to create both simple and complex materials. This document describes all the features available to materials and how to create your own material.

## Core concepts

Material

A material defines the visual appearance of a surface. To completely describe and render a surface, a material provides the following information:

- Material model
- Set of use-controllable named parameters
- Raster state (blending mode, backface culling, etc.)
- Vertex shader code
- Fragment shader code

Material model

Also called _shading model_ or _lighting model_, the material model defines the intrinsic properties of a surface. These properties have a direct influence on the way lighting is computed and therefore on the appearance of a surface.

Material definition

A text file that describes all the information required by a material. This is the file that you will directly author to create new materials.

Material package

At runtime, materials are loaded from _material packages_ compiled from material definitions using the `matc` tool. A material package contains all the information required to describe a material, and shaders generated for the target runtime platforms. This is necessary because different platforms (Android, macOS, Linux, etc.) use different graphics APIs or different variants of similar graphics APIs (OpenGL vs OpenGL ES for instance).

Material instance

A material instance is a reference to a material and a set of values for the different values of that material. Material instances are not covered in this document as they are created and manipulated directly from code using Filament's APIs.

# Material models

Filament materials can use one of the following material models:

- Lit (or standard)
- Subsurface
- Cloth
- Unlit
- Specular glossiness (legacy)

## Lit model

The lit model is Filament's standard material model. This physically-based shading model was designed after to offer good interoperability with other common tools and engines such as _Unity 5_, _Unreal Engine 4_, _Substance Designer_ or _Marmoset Toolbag_.

This material model can be used to describe many non-metallic surfaces (_dielectrics_) or metallic surfaces (_conductors_).

The appearance of a material using the standard model is controlled using the properties described in [table 1](#table_standardproperties).

Property

Definition

**baseColor**

Diffuse albedo for non-metallic surfaces, and specular color for metallic surfaces

**metallic**

Whether a surface appears to be dielectric (0.0) or conductor (1.0). Often used as a binary value (0 or 1)

**roughness**

Perceived smoothness (1.0) or roughness (0.0) of a surface. Smooth surfaces exhibit sharp reflections

**reflectance**

Fresnel reflectance at normal incidence for dielectric surfaces. This directly controls the strength of the reflections

**sheenColor**

Strength of the sheen layer

**sheenRoughness**

Perceived smoothness or roughness of the sheen layer

**clearCoat**

Strength of the clear coat layer

**clearCoatRoughness**

Perceived smoothness or roughness of the clear coat layer

**anisotropy**

Amount of anisotropy in either the tangent or bitangent direction

**anisotropyDirection**

Local surface direction in tangent space

**ambientOcclusion**

Defines how much of the ambient light is accessible to a surface point. It is a per-pixel shadowing factor between 0.0 and 1.0

**normal**

A detail normal used to perturb the surface using _bump mapping_ (_normal mapping_)

**bentNormal**

A normal pointing in the average unoccluded direction. Can be used to improve indirect lighting quality

**clearCoatNormal**

A detail normal used to perturb the clear coat layer using _bump mapping_ (_normal mapping_)

**emissive**

Additional diffuse albedo to simulate emissive surfaces (such as neons, etc.) This property is mostly useful in an HDR pipeline with a bloom pass

**postLightingColor**

Additional color that can be blended with the result of the lighting computations. See `postLightingBlending`

**ior**

Index of refraction, either for refractive objects or as an alternative to reflectance

**transmission**

Defines how much of the diffuse light of a dielectric is transmitted through the object, in other words this defines how transparent an object is

**absorption**

Absorption factor for refractive objects

**microThickness**

Thickness of the thin layer of refractive objects

**thickness**

Thickness of the solid volume of refractive objects

**Table 1:** Properties of the standard model

The type and range of each property is described in [table 2](#table_standardpropertiestypes).

Property

Type

Range

Note

**baseColor**

float4

\[0..1\]

Pre-multiplied linear RGB

**metallic**

float

\[0..1\]

Should be 0 or 1

**roughness**

float

\[0..1\]

**reflectance**

float

\[0..1\]

Prefer values > 0.35

**sheenColor**

float3

\[0..1\]

Linear RGB

**sheenRoughness**

float

\[0..1\]

**clearCoat**

float

\[0..1\]

Should be 0 or 1

**clearCoatRoughness**

float

\[0..1\]

**anisotropy**

float

\[−1..1\]

Anisotropy is in the tangent direction when this value is positive

**anisotropyDirection**

float3

\[0..1\]

Linear RGB, encodes a direction vector in tangent space

**ambientOcclusion**

float

\[0..1\]

**normal**

float3

\[0..1\]

Linear RGB, encodes a direction vector in tangent space

**bentNormal**

float3

\[0..1\]

Linear RGB, encodes a direction vector in tangent space

**clearCoatNormal**

float3

\[0..1\]

Linear RGB, encodes a direction vector in tangent space

**emissive**

float4

rgb=\[0..n\], a=\[0..1\]

Linear RGB intensity in nits, alpha encodes the exposure weight

**postLightingColor**

float4

\[0..1\]

Pre-multiplied linear RGB

**ior**

float

\[1..n\]

Optional, usually deduced from the reflectance

**transmission**

float

\[0..1\]

**absorption**

float3

\[0..n\]

**microThickness**

float

\[0..n\]

**thickness**

float

\[0..n\]

**Table 2:** Range and type of the standard model's properties

About linear RGB

Several material model properties expect RGB colors. Filament materials use RGB colors in linear space and you must take proper care of supplying colors in that space. See the [Linear colors](#linearcolors) section for more information.

About pre-multiplied RGB

Filament materials expect colors to use pre-multiplied alpha. See the [Pre-multiplied alpha](#pre-multipliedalpha) section for more information.

About `absorption`

The light attenuation through the material is defined as \\(e^{-absorption \\cdot distance}\\), and the distance depends on the `thickness` parameter. If `thickness` is not provided, then the `absorption` parameter is used directly and the light attenuation through the material becomes \\(1 - absorption\\). To obtain a certain color at a desired distance, the above equation can be inverted such as \\(absorption = -\\frac{ln(color)}{distance}\\).

About `ior` and `reflectance`

The index of refraction (IOR) and the reflectance represent the same physical attribute, therefore they don't need to be both specified. Typically, only the reflectance is specified, and the IOR is deduced automatically. When only the IOR is specified, the reflectance is then deduced automatically. It is possible to specify both, in which case their values are kept as-is, which can lead to physically impossible materials, however, this might be desirable for artistic reasons.

About `thickness` and `microThickness` for refraction

`thickness` represents the thickness of solid objects in the direction of the normal, for satisfactory results, this should be provided per fragment (e.g.: as a texture) or at least per vertex. `microThickness` represent the thickness of the thin layer of an object, and can generally be provided as a constant value. For example, a 1mm thin hollow sphere of radius 1m, would have a `thickness` of 1 and a `microThickness` of 0.001. Currently `thickness` is not used when `refractionType` is set to `thin`.

### Base color

The `baseColor` property defines the perceived color of an object (sometimes called albedo). The effect of `baseColor` depends on the nature of the surface, controlled by the `metallic` property explained in the [Metallic](#metallic) section.

Non-metals (dielectrics)

Defines the diffuse color of the surface. Real-world values are typically found in the range \\(\[10..240\]\\) if the value is encoded between 0 and 255, or in the range \\(\[0.04..0.94\]\\) between 0 and 1. Several examples of base colors for non-metallic surfaces can be found in [table 3](#table_basecolorsdielectrics).

Metal

sRGB

Hexadecimal

Color

Coal

0.19, 0.19, 0.19

#323232

Rubber

0.21, 0.21, 0.21

#353535

Mud

0.33, 0.24, 0.19

#553d31

Wood

0.53, 0.36, 0.24

#875c3c

Vegetation

0.48, 0.51, 0.31

#7b824e

Brick

0.58, 0.49, 0.46

#947d75

Sand

0.69, 0.66, 0.52

#b1a884

Concrete

0.75, 0.75, 0.73

#c0bfbb

**Table 3:** `baseColor` for common non-metals

Metals (conductors)

Defines the specular color of the surface. Real-world values are typically found in the range \\(\[170..255\]\\) if the value is encoded between 0 and 255, or in the range \\(\[0.66..1.0\]\\) between 0 and 1. Several examples of base colors for metallic surfaces can be found in [table 4](#table_basecolorsconductors).

Metal

sRGB

Hexadecimal

Color

Silver

0.97, 0.96, 0.91

#f7f4e8

Aluminum

0.91, 0.92, 0.92

#e8eaea

Titanium

0.76, 0.73, 0.69

#c1baaf

Iron

0.77, 0.78, 0.78

#c4c6c6

Platinum

0.83, 0.81, 0.78

#d3cec6

Gold

1.00, 0.85, 0.57

#ffd891

Brass

0.98, 0.90, 0.59

#f9e596

Copper

0.97, 0.74, 0.62

#f7bc9e

**Table 4:** `baseColor` for common metals

### Metallic

The `metallic` property defines whether the surface is a metallic (_conductor_) or a non-metallic (_dielectric_) surface. This property should be used as a binary value, set to either 0 or 1. Intermediate values are only truly useful to create transitions between different types of surfaces when using textures.

This property can dramatically change the appearance of a surface. Non-metallic surfaces have chromatic diffuse reflection and achromatic specular reflection (reflected light does not change color). Metallic surfaces do not have any diffuse reflection and chromatic specular reflection (reflected light takes on the color of the surfaced as defined by `baseColor`).

The effect of `metallic` is shown in [figure 1](#figure_metallicproperty) (click on the image to see a larger version).

[![](../images/materials/metallic.png)](../images/materials/metallic.png)

**Figure 1:** `metallic` varying from 0.0

### Roughness

The `roughness` property controls the perceived smoothness of the surface. When `roughness` is set to 0, the surface is perfectly smooth and highly glossy. The rougher a surface is, the “blurrier” the reflections are. This property is often called _glossiness_ in other engines and tools, and is simply the opposite of the roughness (`roughness = 1 - glossiness`).

### Non-metals

The effect of `roughness` on non-metallic surfaces is shown in [figure 2](#figure_roughnessproperty) (click on the image to see a larger version).

[![](../images/materials/dielectric_roughness.png)](../images/materials/dielectric_roughness.png)

**Figure 2:** Dielectric `roughness` varying from 0.0

### Metals

The effect of `roughness` on metallic surfaces is shown in [figure 3](#figure_roughnessconductorproperty) (click on the image to see a larger version).

[![](../images/materials/conductor_roughness.png)](../images/materials/conductor_roughness.png)

**Figure 3:** Conductor `roughness` varying from 0.0

### Refraction

When refraction through an object is enabled (using a `refractonType` of `thin` or `solid`), the `roughness` property will also affect the refractions, as shown in [figure 4](#figure_roughnessrefractionproperty) (click on the image to see a larger version).

[![](../images/materials/refraction_roughness.png)](../images/materials/refraction_roughness.png)

**Figure 4:** Refractive sphere with `roughness` varying from 0.0

### Reflectance

The `reflectance` property only affects non-metallic surfaces. This property can be used to control the specular intensity and index of refraction of materials. This value is defined between 0 and 1 and represents a remapping of a percentage of reflectance. For instance, the default value of 0.5 corresponds to a reflectance of 4%. Values below 0.35 (2% reflectance) should be avoided as no real-world materials have such low reflectance.

The effect of `reflectance` on non-metallic surfaces is shown in [figure 5](#figure_reflectanceproperty) (click on the image to see a larger version).

[![](../images/materials/reflectance.png)](../images/materials/reflectance.png)

**Figure 5:** `reflectance` varying from 0.0 (left)

[Figure 6](#figure_reflectance) shows common values and how they relate to the mapping function.

[![](../images/diagram_reflectance.png)](../images/diagram_reflectance.png)

**Figure 6:** Common reflectance values

[Table 5](#table_commonmatreflectance) describes acceptable reflectance values for various types of materials (no real world material has a value under 2%).

Material

Reflectance

IOR

Linear value

Water

2%

1.33

0.35

Fabric

4% to 5.6%

1.5 to 1.62

0.5 to 0.59

Common liquids

2% to 4%

1.33 to 1.5

0.35 to 0.5

Common gemstones

5% to 16%

1.58 to 2.33

0.56 to 1.0

Plastics, glass

4% to 5%

1.5 to 1.58

0.5 to 0.56

Other dielectric materials

2% to 5%

1.33 to 1.58

0.35 to 0.56

Eyes

2.5%

1.38

0.39

Skin

2.8%

1.4

0.42

Hair

4.6%

1.55

0.54

Teeth

5.8%

1.63

0.6

Default value

4%

1.5

0.5

**Table 5:** Reflectance of common materials

Note that the `reflectance` property also defines the index of refraction of the surface. When this property is defined it is not necessary to define the `ior` property. Setting either of these properties will automatically compute the other property. It is possible to specify both, in which case their values are kept as-is, which can lead to physically impossible materials, however, this might be desirable for artistic reasons.

The `reflectance` property is designed as a normalized property in the range 0..1 which makes it easy to define from a texture.

See section [3.1.20](#toc3.1.20) for more information about the `ior` property and refractive indices.

### Sheen color

The sheen color controls the color appearance and strength of an optional sheen layer on top of the base layer described by the properties above. The sheen layer always sits below the clear coat layer if such a layer is present.

The sheen layer can be used to represent cloth and fabric materials. Please refer to section [3.3](#toc3.3) for more information about cloth and fabric materials.

The effect of `sheenColor` is shown in [figure 7](#figure_materialsheencolor) (click on the image to see a larger version).

[![](../images/screenshot_sheen_color.png)](../images/screenshot_sheen_color.png)

**Figure 7:** Different sheen colors

If you do not need the other properties offered by the standard lit material model but want to create a cloth-like or fabric-like appearance, it is more efficient to use the dedicated cloth model described in section [3.3](#toc3.3).

### Sheen roughness

The `sheenRoughness` property is similar to the `roughness` property but applies only to the sheen layer.

The effect of `sheenRoughness` on a rough metal is shown in [figure 8](#figure_sheenroughnessproperty) (click on the image to see a larger version). In this picture, the base layer is a dark blue, with `metallic` set to `0.0` and `roughness` set to `1.0`.

[![](../images/materials/sheen_roughness.png)](../images/materials/sheen_roughness.png)

**Figure 8:** `sheenRoughness` varying from 0.0

### Clear coat

Multi-layer materials are fairly common, particularly materials with a thin translucent layer over a base layer. Real world examples of such materials include car paints, soda cans, lacquered wood and acrylic.

The `clearCoat` property can be used to describe materials with two layers. The clear coat layer will always be isotropic and dielectric.

[![](../images/material_carbon_fiber.png)](../images/material_carbon_fiber.png)

**Figure 9:** Comparison of a carbon-fiber material under the standard material model

The `clearCoat` property controls the strength of the clear coat layer. This should be treated as a binary value, set to either 0 or 1. Intermediate values are useful to control transitions between parts of the surface that have a clear coat layers and parts that don't.

The effect of `clearCoat` on a rough metal is shown in [figure 10](#figure_clearcoatproperty) (click on the image to see a larger version).

[![](../images/materials/clear_coat.png)](../images/materials/clear_coat.png)

**Figure 10:** `clearCoat` varying from 0.0

The clear coat layer effectively doubles the cost of specular computations. Do not assign a value, even 0.0, to the clear coat property if you don't need this second layer.

The clear coat layer is added on top of the sheen layer if present.

### Clear coat roughness

The `clearCoatRoughness` property is similar to the `roughness` property but applies only to the clear coat layer.

The effect of `clearCoatRoughness` on a rough metal is shown in [figure 11](#figure_clearcoatroughnessproperty) (click on the image to see a larger version).

[![](../images/materials/clear_coat_roughness.png)](../images/materials/clear_coat_roughness.png)

**Figure 11:** `clearCoatRoughness` varying from 0.0

### Anisotropy

Many real-world materials, such as brushed metal, can only be replicated using an anisotropic reflectance model. A material can be changed from the default isotropic model to an anisotropic model by using the `anisotropy` property.

[![](../images/material_anisotropic.png)](../images/material_anisotropic.png)

**Figure 12:** Comparison of isotropic material

The effect of `anisotropy` on a rough metal is shown in [figure 13](#figure_anisotropyproperty) (click on the image to see a larger version).

[![](../images/materials/anisotropy.png)](../images/materials/anisotropy.png)

**Figure 13:** `anisotropy` varying from 0.0

The [figure 14](#figure_anisotropydir) below shows how the direction of the anisotropic highlights can be controlled by using either positive or negative values: positive values define anisotropy in the tangent direction and negative values in the bitangent direction.

[![](../images/screenshot_anisotropy_direction.png)](../images/screenshot_anisotropy_direction.png)

**Figure 14:** Positive (left) vs negative

The anisotropic material model is slightly more expensive than the standard material model. Do not assign a value (even 0.0) to the `anisotropy` property if you don't need anisotropy.
