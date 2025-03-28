### Anisotropy direction

The `anisotropyDirection` property defines the direction of the surface at a given point and thus control the shape of the specular highlights. It is specified as vector of 3 values that usually come from a texture, encoding the directions local to the surface in tangent space. Because the direction is in tangent space, the Z component should be set to 0.

The effect of `anisotropyDirection` on a metal is shown in [figure 16](#figure_anisotropydirectionproperty) (click on the image to see a larger version).

[![](../images/screenshot_anisotropy.png)](../images/screenshot_anisotropy.png)

**Figure 15:** Anisotropic metal rendered

The result shown in [figure 16](#figure_anisotropydirectionproperty) was obtained using the direction map shown in [figure 16](#figure_anisotropydirectionproperty).

[![](../images/screenshot_anisotropy_map.jpg)](../images/screenshot_anisotropy_map.jpg)

**Figure 16:** Example of Lighting: specularAmbientOcclusiona direction map

### Ambient occlusion

The `ambientOcclusion` property defines how much of the ambient light is accessible to a surface point. It is a per-pixel shadowing factor between 0.0 (fully shadowed) and 1.0 (fully lit). This property only affects diffuse indirect lighting (image-based lighting), not direct lights such as directional, point and spot lights, nor specular lighting.

[![](../images/screenshot_ao.jpg)](../images/screenshot_ao.jpg)

**Figure 17:** Comparison of materials without diffuse ambient occlusion

### Normal

The `normal` property defines the normal of the surface at a given point. It usually comes from a _normal map_ texture, which allows to vary the property per-pixel. The normal is supplied in tangent space, which means that +Z points outside of the surface.

For example, let's imagine that we want to render a piece of furniture covered in tufted leather. Modeling the geometry to accurately represent the tufted pattern would require too many triangles so we instead bake a high-poly mesh into a normal map. Once the base map is applied to a simplified mesh, we get the result in [figure 18](#figure_normalmapped).

Note that the `normal` property affects the _base layer_ and not the clear coat layer.

[![](../images/screenshot_normal_mapping.jpg)](../images/screenshot_normal_mapping.jpg)

**Figure 18:** Low-poly mesh without normal mapping (left)

Using a normal map increases the runtime cost of the material model.

### Bent normal

The `bentNormal` property defines the average unoccluded direction at a point on the surface. It is used to improve the accuracy of indirect lighting. Bent normals can also improve the quality of specular ambient occlusion (see section [4.2.33](#toc4.2.33) about `specularAmbientOcclusion`).

Bent normals can greatly increase the visual fidelity of an asset with various cavities and concave areas, as shown in [figure 19](#figure_bentnormalmapped). See the areas of the ears, nostrils and eyes for instance.

[![](../images/material_bent_normal.gif)](../images/material_bent_normal.gif)

**Figure 19:** Example of a model rendered with and without a bent normal map. Both

### Clear coat normal

The `clearCoatNormal` property defines the normal of the clear coat layer at a given point. It behaves otherwise like the `normal` property.

[![](../images/screenshot_clear_coat_normal.jpg)](../images/screenshot_clear_coat_normal.jpg)

**Figure 20:** A material with a clear coat normal

Using a clear coat normal map increases the runtime cost of the material model.

### Emissive

The `emissive` property can be used to simulate additional light emitted by the surface. It is defined as a `float4` value that contains an RGB intensity in nits as well as an exposure weight (in the alpha channel).

The intensity in nits allows an emissive surface to function as a light and can be used to recreate real world surfaces. For instance a computer display has an intensity between 200 and 1,000 nits.

If you prefer to work in EV (or f-stops), you can simplify multiply your emissive color by the output of the API `filament::Exposure::luminance(ev)`. This API returns the luminance in nits of the specific EV. You can perform this conversion yourself using the following formula, where \\(L\\) is the final intensity in nits: \\( L = 2^{EV - 3} \\).

The exposure weight carried in the alpha channel can be used to undo the camera exposure, and thus force an emissive surface to bloom. When the exposure weight is set to 0, the emissive intensity is not affected by the camera exposure. When the weight is set to 1, the intensity is multiplied by the camera exposure like with any regular light.

### Post-lighting color

The `postLightingColor` can be used to modify the surface color after lighting computations. This property has no physical meaning and only exists to implement specific effects or to help with debugging. This property is defined as a `float4` value containing a pre-multiplied RGB color in linear space.

The post-lighting color is blended with the result of lighting according to the blending mode specified by the `postLightingBlending` material option. Please refer to the documentation of this option for more information.

`postLightingColor` can be used as a simpler `emissive` property by setting `postLightingBlending` to `add` and by providing an RGB color with alpha set to `0.0`.

### Index of refraction

The `ior` property only affects non-metallic surfaces. This property can be used to control the index of refraction and the specular intensity of materials. The `ior` property is intended to be used with refractive (transmissive) materials, which are enabled when the `refractionMode` is set to `cubemap` or `screenspace`. It can also be used on non-refractive objects as an alternative to setting the reflectance.

The index of refraction (or refractive index) of a material is a dimensionless number that describes how fast light travels through that material. The higher the number, the slower light travels through the medium. More importantly for rendering materials, the refractive index determines how the path light travels is bent when entering the material. Higher indices of refraction will cause light to bend further away from the initial path.

[Table 6](#table_commonmatior) describes acceptable refractive indices for various types of materials.

| Material                   | IOR          |
| -------------------------- | ------------ |
| Air                        | 1.0          |
| Water                      | 1.33         |
| Common liquids             | 1.33 to 1.5  |
| Common gemstones           | 1.58 to 2.33 |
| Plastics, glass            | 1.5 to 1.58  |
| Other dielectric materials | 1.33 to 1.58 |

**Table 6:** Index of refraction of common materials

The appearance of a refractive material will greatly depend on the `refractionType` and `refractionMode` settings of the material. Refer to section [4.2.21](#toc4.2.21) and section [4.2.20](#toc4.2.20) for more information.

The effect of `ior` when `refractionMode` is set to `cubemap` and `refractionType` is set to `solid` can be seen in [figure 21](#figure_iorproperty2) (click on the image to see a larger version).

[![](../images/materials/ior.png)](../images/materials/ior.png)

**Figure 21:** `transmission` varying from 1.0

[Figure 22](#figure_iorproperty) shows the comparison of a sphere of `ior` 1.0 with a sphere of `ior` 1.33, with the `refractionMode` set to `screenspace` and the `refractionType` set to `solid` (click on the image to see a larger version).

[![](../images/material_ior.png)](../images/material_ior.png)

**Figure 22:** `ior` of 1.0 (left) and 1.33 (right)

Note that the `ior` property also defines the reflectance (or specular intensity) of the surface. When this property is defined it is not necessary to define the `reflectance` property. Setting either of these properties will automatically compute the other property. It is possible to specify both, in which case their values are kept as-is, which can lead to physically impossible materials, however, this might be desirable for artistic reasons.

See the [Reflectance](#reflectance) section for more information on the `reflectance` property.

Refractive materials are affected by the `roughness` property. Rough materials will scatter light, creating a diffusion effect useful to recreate “blurry” appearances such as frosted glass, certain plastics, etc.

### Transmission

The `transmission` property defines what ratio of diffuse light is transmitted through a refractive material. This property only affects materials with a `refractionMode` set to `cubemap` or `screenspace`.

When `transmission` is set to 0, no amount of light is transmitted and the diffuse component of the surface is 100% visible. When `transmission` is set to 1, all the light is transmitted and the diffuse component is not visible anymore, only the specular component is.

The effect of `transmission` on a glossy dielectric (`ior` of 1.5, `refractionMode` set to `cubemap`, `refractionType` set to `solid`) is shown in [figure 23](#figure_transmissionproperty) (click on the image to see a larger version).

[![](../images/materials/transmission.png)](../images/materials/transmission.png)

**Figure 23:** `transmission` varying from 0.0

The `transmission` property is useful to create decals, paint, etc. at the surface of refractive materials.

### Absorption

The `absorption` property defines the absorption coefficients of light transmitted through the material. [Figure 24](#figure_absorptionexample) shows the effect of `absorption` on a refracting object with an index of refraction of 1.5 and a base color set to white.

[![](../images/material_absorption.png)](../images/material_absorption.png)

**Figure 24:** Refracting object without (left)

Transmittance through a volume is exponential with respect to the optical depth (defined either with `microThickness` or `thickness`). The computed color follows the following formula:

$$color \\cdot e^{-absorption \\cdot distance}$$

Where `distance` is either `microThickness` or `thickness`, that is the distance light will travel through the material at a given point. If no thickness/distance is specified, the computed color follows this formula instead:

$$color \\cdot (1 - absorption)$$

The effect of varying the `absorption` coefficients is shown in [figure 25](#figure_absorptionproperty) (click on the image to see a larger version). In this picture, the object has a fixed `thickness` of 4.5 and an index of refraction set to 1.3.

[![](../images/materials/absorption.png)](../images/materials/absorption.png)

**Figure 25:** `absorption` varying from (0.0, 0.02, 0.14)

Setting the absorption coefficients directly can be unintuitive which is why we recommend working with a _transmittance color_ and a _“at distance”_ factor instead. These two parameters allow an artist to specify the precise color the material should have at a specified distance through the volume. The value to pass to `absorption` can be computed this way:

$$absorption = -\\frac{ln(transmittanceColor)}{atDistance}$$

While this computation can be done in the material itself we recommend doing it offline whenever possible. Filament provides an API for this purpose, `Color::absorptionAtDistance()`.

### Micro-thickness and thickness

The `microThickness` and `thickness` properties define the optical depth of the material of a refracting object. `microThickness` is used when `refractionType` is set to `thin`, and `thickness` is used when `refractionType` is set to `volume`.

`thickness` represents the thickness of solid objects in the direction of the normal, for satisfactory results, this should be provided per fragment (e.g.: as a texture) or at least per vertex.

`microThickness` represent the thickness of the thin layer (shell) of an object, and can generally be provided as a constant value. For example, a 1mm thin hollow sphere of radius 1m, would have a `thickness` of 1 and a `microThickness` of 0.001. Currently `thickness` is not used when `refractionType` is set to `thin`. Both properties are made available for possible future use.

Both `thickness` and `microThickness` are used to compute the transmitted color of the material when the `absorption` property is set. In solid volumes, `thickness` will also affect how light rays are refracted.

The effect `thickness` in a solid volume with `refractionMode` set to `screenSpace` is shown in [figure 26](#figure_thicknessproperty) (click on the image to see a larger version). Note how the `thickness` value not only changes the effect of `absorption` but also modifies the direction of the refracted light.

[![](../images/materials/thickness.png)](../images/materials/thickness.png)

**Figure 26:** `thickness` varying from 0.0

[Figure 27](#figure_varyingthickness) shows what a prism with spatially varying `thickness` looks like when the `refractionType` is set to `solid` and `absorption` coefficients are set.

[![](../images/material_thickness.png)](../images/material_thickness.png)

**Figure 27:** `thickness` varying from 0.0 at the top of the prism to 3.0 at the

## Subsurface model

### Thickness

### Subsurface color

### Subsurface power

## Cloth model

All the material models described previously are designed to simulate dense surfaces, both at a macro and at a micro level. Clothes and fabrics are however often made of loosely connected threads that absorb and scatter incident light. When compared to hard surfaces, cloth is characterized by a softer specular lob with a large falloff and the presence of fuzz lighting, caused by forward/backward scattering. Some fabrics also exhibit two-tone specular colors (velvets for instance).

[Figure 28](#figure_materialcloth) shows how the standard material model fails to capture the appearance of a sample of denim fabric. The surface appears rigid (almost plastic-like), more similar to a tarp than a piece of clothing. This figure also shows how important the softer specular lobe caused by absorption and scattering is to the faithful recreation of the fabric.

[![](../images/screenshot_cloth.png)](../images/screenshot_cloth.png)

**Figure 28:** Comparison of denim fabric rendered using the standard model

Velvet is an interesting use case for a cloth material model. As shown in [figure 29](#figure_materialvelvet) this type of fabric exhibits strong rim lighting due to forward and backward scattering. These scattering events are caused by fibers standing straight at the surface of the fabric. When the incident light comes from the direction opposite to the view direction, the fibers will forward scatter the light. Similarly, when the incident light from the same direction as the view direction, the fibers will scatter the light backward.

[![](../images/screenshot_cloth_velvet.png)](../images/screenshot_cloth_velvet.png)

**Figure 29:** Velvet fabric showcasing forward and

It is important to note that there are types of fabrics that are still best modeled by hard surface material models. For instance, leather, silk and satin can be recreated using the standard or anisotropic material models.

The cloth material model encompasses all the parameters previously defined for the standard material mode except for _metallic_ and _reflectance_. Two extra parameters described in [table 7](#table_clothproperties) are also available.

| Parameter           | Definition                                                                             |
| ------------------- | -------------------------------------------------------------------------------------- |
| **sheenColor**      | Specular tint to create two-tone specular fabrics (defaults to \( \sqrt{baseColor} \)) |
| **subsurfaceColor** | Tint for the diffuse color after scattering and absorption through the material        |

**Table 7:** Cloth model parameters

The type and range of each property is described in [table 8](#table_clothpropertiestypes).

| Property            | Type   | Range  | Note       |
| ------------------- | ------ | ------ | ---------- |
| **sheenColor**      | float3 | $0..1$ | Linear RGB |
| **subsurfaceColor** | float3 | $0..1$ | Linear RGB |

**Table 8:** Range and type of the cloth model's properties

To create a velvet-like material, the base color can be set to black (or a dark color). Chromaticity information should instead be set on the sheen color. To create more common fabrics such as denim, cotton, etc. use the base color for chromaticity and use the default sheen color or set the sheen color to the luminance of the base color.

To see the effect of the `roughness` parameter make sure the `sheenColor` is brighter than `baseColor`. This can be used to create a fuzz effect. Taking the luminance of `baseColor` as the `sheenColor` will produce a fairly natural effect that works for common cloth. A dark `baseColor` combined with a bright/saturated `sheenColor` can be used to create velvet.

The `subsurfaceColor` parameter should be used with care. High values can interfere with shadows in some areas. It is best suited for subtle transmission effects through the material.

### Sheen color

The `sheenColor` property can be used to directly modify the specular reflectance. It offers better control over the appearance of cloth and gives give the ability to create two-tone specular materials.

The effect of `sheenColor` is shown in [figure 30](#figure_materialclothsheen) (click on the image to see a larger version).

[![](../images/screenshot_cloth_sheen.png)](../images/screenshot_cloth_sheen.png)

**Figure 30:** Blue fabric without (left) and with (right) sheen

### Subsurface color

The `subsurfaceColor` property is not physically-based and can be used to simulate the scattering, partial absorption and re-emission of light in certain types of fabrics. This is particularly useful to create softer fabrics.

The cloth material model is more expensive to compute when the `subsurfaceColor` property is used.

The effect of `subsurfaceColor` is shown in [figure 31](#figure_materialclothsubsurface) (click on the image to see a larger version).

[![](../images/screenshot_cloth_subsurface.png)](../images/screenshot_cloth_subsurface.png)

**Figure 31:** White cloth (left column) vs white cloth with

## Unlit model

The unlit material model can be used to turn off all lighting computations. Its primary purpose is to render pre-lit elements such as a cubemap, external content (such as a video or camera stream), user interfaces, visualization/debugging etc. The unlit model exposes only two properties described in [table 9](#table_unlitproperties).

| Property              | Definition                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **baseColor**         | Surface diffuse color                                                                                                       |
| **emissive**          | Additional diffuse color to simulate emissive surfaces. This property is mostly useful in an HDR pipeline with a bloom pass |
| **postLightingColor** | Additional color to blend with base color and emissive                                                                      |

**Table 9:** Properties of the standard model

The type and range of each property is described in [table 10](#table_unlitpropertiestypes).

| Property              | Type   | Range                | Note                                                            |
| --------------------- | ------ | -------------------- | --------------------------------------------------------------- |
| **baseColor**         | float4 | $0..1$               | Pre-multiplied linear RGB                                       |
| **emissive**          | float4 | rgb=$0..n$, a=$0..1$ | Linear RGB intensity in nits, alpha encodes the exposure weight |
| **postLightingColor** | float4 | $0..1$               | Pre-multiplied linear RGB                                       |

**Table 10:** Range and type of the unlit model's properties

The value of `postLightingColor` is blended with the sum of `emissive` and `baseColor` according to the blending mode specified by the `postLightingBlending` material option.

[Figure 32](#figure_materialunlit) shows an example of the unlit material model (click on the image to see a larger version).

[![](../images/screenshot_unlit.jpg)](../images/screenshot_unlit.jpg)

**Figure 32:** The unlit model is used to render debug information

## Specular glossiness

This alternative lighting model exists to comply with legacy standards. Since it is not a physically-based formulation, we do not recommend using it except when loading legacy assets.

This model encompasses the parameters previously defined for the standard lit mode except for _metallic_, _reflectance_, and _roughness_. It adds parameters for _specularColor_ and _glossiness_.

| Parameter         | Definition                        |
| ----------------- | --------------------------------- |
| **baseColor**     | Surface diffuse color             |
| **specularColor** | Specular tint (defaults to black) |
| **glossiness**    | Glossiness (defaults to 0.0)      |

**Table 11:** Properties of the specular-glossiness shading model

The type and range of each property is described in [table 12](#table_glossinesspropertiestypes).

| Property          | Type   | Range  | Note                      |
| ----------------- | ------ | ------ | ------------------------- |
| **baseColor**     | float4 | $0..1$ | Pre-multiplied linear RGB |
| **specularColor** | float3 | $0..1$ | Linear RGB                |
| **glossiness**    | float  | $0..1$ | Inverse of roughness      |

**Table 12:** Range and type of the specular-glossiness model's properties

# Material definitions

A material definition is a text file that describes all the information required by a material:

- Name
- User parameters
- Material model
- Required attributes
- Interpolants (called _variables_)
- Raster state (blending mode, etc.)
- Shader code (fragment shader, optionally vertex shader)

## Format

The material definition format is a format loosely based on [JSON](https://www.json.org/) that we call _JSONish_. At the top level a material definition is composed of 3 different blocks that use the JSON object notation:

```cpp
    material {
        // material properties
    }

    vertex {
        // vertex shader, optional
    }

    fragment {
        // fragment shader
    }
```

A minimum viable material definition must contain a `material` preamble and a `fragment` block. The `vertex` block is optional.

### Differences with JSON

In JSON, an object is made of key/value _pairs_. A JSON pair has the following syntax:

```json
    "key" : value
```

Where value can be a string, number, object, array or a literal (`true`, `false` or `null`). While this syntax is perfectly valid in a material definition, a variant without quotes around strings is also accepted in JSONish:

```json
    key : value
```

Quotes remain mandatory when the string contains spaces.

The `vertex` and `fragment` blocks contain unescaped, unquoted GLSL code, which is not valid in JSON.

Single-line C++-style comments are allowed.

The key of a pair is case-sensitive.

The value of a pair is not case-sensitive.

### Example

The following code listing shows an example of a valid material definition. This definition uses the _lit_ material model (see [Lit model](#litmodel) section), uses the default opaque blending mode, requires that a set of UV coordinates be presented in the rendered mesh and defines 3 user parameters. The following sections of this document describe the `material` and `fragment` blocks in detail.

```cpp
    material {
        name : "Textured material",
        parameters : [
            {
               type : sampler2d,
               name : texture
            },
            {
               type : float,
               name : metallic
            },
            {
                type : float,
                name : roughness
            }
        ],
        requires : [
            uv0
        ],
        shadingModel : lit,
        blending : opaque
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor = texture(materialParams_texture, getUV0());
            material.metallic = materialParams.metallic;
            material.roughness = materialParams.roughness;
        }
    }
```

## Material block

The material block is mandatory block that contains a list of property pairs to describe all non-shader data.

### General: name

Type

`string`

Value

Any string. Double quotes are required if the name contains spaces.

Description

Sets the name of the material. The name is retained at runtime for debugging purpose.

```cpp
    material {
        name : stone
    }

    material {
        name : "Wet pavement"
    }
```

### General: featureLevel

| Type      | `number`                                            |
| --------- | --------------------------------------------------- |
| **Value** | An integer value, either 1, 2, or 3. Defaults to 1. |

### Feature Level and Guaranteed Features

| Level | Guaranteed Features                                 |
| ----- | --------------------------------------------------- |
| 1     | 9 textures per material                             |
| 2     | 9 textures per material, cubemap arrays, ESSL 3.10  |
| 3     | 12 textures per material, cubemap arrays, ESSL 3.10 |

**Table 13:** Feature levels

Description

Sets the feature level of the material. Each feature level defines a set of features the material can use. If the material uses a feature not supported by the selected level, `matc` will generate an error during compilation. A given feature level is guaranteed to support all features of lower feature levels.

```cpp
    material {
        featureLevel : 2
    }
```

Bugs

`matc` doesn't verify that a material is not using features above its selected feature level.

### General: shadingModel

Type

- `string`

Value

- Any of `lit`, `subsurface`, `cloth`, `unlit`, `specularGlossiness`. Defaults to `lit`.

Description

- Selects the material model as described in the [Material models](#materialmodels) section.

```cpp
    material {
        shadingModel : unlit
    }

    material {
        shadingModel : "subsurface"
    }
```

### General: parameters

Type

array of parameter objects

Value

Each entry is an object with the properties `name` and `type`, both of `string` type. The name must be a valid GLSL identifier. Entries also have an optional `precision`, which can be one of `default` (best precision for the platform, typically `high` on desktop, `medium` on mobile), `low`, `medium`, `high`. The type must be one of the types described in [table 14](#table_materialparamstypes).

| Type            | Description                          |
| --------------- | ------------------------------------ |
| bool            | Single boolean                       |
| bool2           | Vector of 2 booleans                 |
| bool3           | Vector of 3 booleans                 |
| bool4           | Vector of 4 booleans                 |
| float           | Single float                         |
| float2          | Vector of 2 floats                   |
| float3          | Vector of 3 floats                   |
| float4          | Vector of 4 floats                   |
| int             | Single integer                       |
| int2            | Vector of 2 integers                 |
| int3            | Vector of 3 integers                 |
| int4            | Vector of 4 integers                 |
| uint            | Single unsigned integer              |
| uint2           | Vector of 2 unsigned integers        |
| uint3           | Vector of 3 unsigned integers        |
| uint4           | Vector of 4 unsigned integers        |
| float3×3        | Matrix of 3×3 floats                 |
| float4×4        | Matrix of 4×4 floats                 |
| sampler2d       | 2D texture                           |
| sampler2dArray  | Array of 2D textures                 |
| samplerExternal | External texture (platform-specific) |
| samplerCubemap  | Cubemap texture                      |

**Table 14:** Material parameter types

Samplers

Sampler types can also specify a `format` which can be either `int` or `float` (defaults to `float`).

Arrays

A parameter can define an array of values by appending `[size]` after the type name, where `size` is a positive integer. For instance: `float[9]` declares an array of nine `float` values. This syntax does not apply to samplers as arrays are treated as separate types.

Description

Lists the parameters required by your material. These parameters can be set at runtime using Filament's material API. Accessing parameters from the shaders varies depending on the type of parameter:

- **Samplers types**: use the parameter name prefixed with `materialParams_`. For instance, `materialParams_myTexture`.
- **Other types**: use the parameter name as the field of a structure called `materialParams`. For instance, `materialParams.myColor`.

```cpp
    material {
    parameters : [
    {
    type : float4,
    name : albedo
    },
    {
    type : sampler2d,
    format : float,
    precision : high,
    name : roughness
    },
    {
    type : float2,
    name : metallicReflectance
    }
    ],
    requires : [
    uv0
    ],
    shadingModel : lit,
    }

    fragment {
    void material(inout MaterialInputs material) {
    prepareMaterial(material);
    material.baseColor = materialParams.albedo;
    material.roughness = texture(materialParams_roughness, getUV0());
    material.metallic = materialParams.metallicReflectance.x;
    material.reflectance = materialParams.metallicReflectance.y;
    }
    }
```
