
### Lighting: clearCoatIorChange

Type

`boolean`

Value

`true` or `false`. Defaults to `true`.

Description

When adding a clear coat layer, the change in index of refraction (IoR) is taken into account to modify the specular color of the base layer. This appears to darken `baseColor`. When this effect is disabled, `baseColor` is left unmodified. See [figure 37](#figure_clearcoatiorchange) for an example of how this property can affect a red metallic base layer.

    material {
        clearCoatIorChange : false
    }

[![](../images/screenshot_clear_coat_ior_change.jpg)](../images/screenshot_clear_coat_ior_change.jpg)

**Figure 37:** The same rough metallic ball with a clear coat layer rendered

### Lighting: multiBounceAmbientOcclusion

Type

`boolean`

Value

`true` or `false`. Defaults to `false` on mobile, `true` on desktop.

Description

Multi-bounce ambient occlusion takes into account interreflections when applying ambient occlusion to image-based lighting. Turning this feature on avoids over-darkening occluded areas. It also takes the surface color into account to generate colored ambient occlusion. [Figure 38](#figure_multibounceao) compares the ambient occlusion term of a surface with and without multi-bounce ambient occlusion. Notice how multi-bounce ambient occlusion introduces color in the occluded areas. [Figure 39](#figure_multibounceaoanimated) toggles between multi-bounce ambient occlusion on and off on a lit brick material to highlight the effects of this property.

    material {
        multiBounceAmbientOcclusion : true
    }

[![](../images/screenshot_multi_bounce_ao.jpg)](../images/screenshot_multi_bounce_ao.jpg)

**Figure 38:** Brick texture amient occlusion map rendered with multi-bounce ambient

[![](../images/screenshot_multi_bounce_ao.gif)](../images/screenshot_multi_bounce_ao.gif)

**Figure 39:** Brick texture rendered with multi-bounce ambient

### Lighting: specularAmbientOcclusion

Type

`string`

Value

`none`, `simple` or `bentNormals`. Defaults to `none` on mobile, `simple` on desktop. For compatibility reasons, `true` and `false` are also accepted and map respectively to `simple` and `none`.

Description

Static ambient occlusion maps and dynamic ambient occlusion (SSAO, etc.) apply to diffuse indirect lighting. When setting this property to other than `none`, a new ambient occlusion term is derived from the surface roughness and applied to specular indirect lighting. This effect helps remove unwanted specular reflections as shown in [figure 40](#figure_specularao). When this value is set to `simple`, Filament uses a cheap but approximate method of computing the specular ambient occlusion term. If this value is set to `bentNormals`, Filament will use a much more accurate but much more expensive method.

    material {
        specularAmbientOcclusion : simple
    }

[![](../images/screenshot_specular_ao.gif)](../images/screenshot_specular_ao.gif)

**Figure 40:** Comparison of specular ambient occlusion on and off. The effect is

### Anti-aliasing: specularAntiAliasing

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Reduces specular aliasing and preserves the shape of specular highlights as an object moves away from the camera. This anti-aliasing solution is particularly effective on glossy materials (low roughness) but increases the cost of the material. The strength of the anti-aliasing effect can be controlled using two other properties: `specularAntiAliasingVariance` and `specularAntiAliasingThreshold`.

    material {
        specularAntiAliasing : true
    }

### Anti-aliasing: specularAntiAliasingVariance

Type

`float`

Value

A value between 0 and 1, set to 0.15 by default.

Description

Sets the screen space variance of the filter kernel used when applying specular anti-aliasing. Higher values will increase the effect of the filter but may increase roughness in unwanted areas.

    material {
        specularAntiAliasingVariance : 0.2
    }

### Anti-aliasing: specularAntiAliasingThreshold

Type

`float`

Value

A value between 0 and 1, set to 0.2 by default.

Description

Sets the clamping threshold used to suppress estimation errors when applying specular anti-aliasing. When set to 0, specular anti-aliasing is disabled.

    material {
        specularAntiAliasingThreshold : 0.1
    }

### Shading: customSurfaceShading

Type

`bool`

Value

`true` or `false`. Defaults to `false`.

Description

Enables custom surface shading when set to true. When surface shading is enabled, the fragment shader must provide an extra function that will be invoked for every light in the scene that may influence the current fragment. Please refer to the [Custom surface shading](#customsurfaceshading) section below for more information.

    material {
        customSurfaceShading : true
    }

## Vertex block

The vertex block is optional and can be used to control the vertex shading stage of the material. The vertex block must contain valid [ESSL 3.0](https://www.khronos.org/registry/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf) code (the version of GLSL supported in OpenGL ES 3.0). You are free to create multiple functions inside the vertex block but you **must** declare the `materialVertex` function:

    vertex {
        void materialVertex(inout MaterialVertexInputs material) {
            // vertex shading code
        }
    }

This function will be invoked automatically at runtime by the shading system and gives you the ability to read and modify material properties using the `MaterialVertexInputs` structure. This full definition of the structure can be found in the [Material vertex inputs](#materialvertexinputs) section.

You can use this structure to compute your custom variables/interpolants or to modify the value of the attributes. For instance, the following vertex blocks modifies both the color and the UV coordinates of the vertex over time:

    material {
        requires : [uv0, color]
    }
    vertex {
        void materialVertex(inout MaterialVertexInputs material) {
            material.color *= sin(getUserTime().x);
            material.uv0 *= sin(getUserTime().x);
        }
    }

In addition to the `MaterialVertexInputs` structure, your vertex shading code can use all the public APIs listed in the [Shader public APIs](#shaderpublicapis) section.

### Material vertex inputs

    struct MaterialVertexInputs {
        float4 color;              // if the color attribute is required
        float2 uv0;                // if the uv0 attribute is required
        float2 uv1;                // if the uv1 attribute is required
        float3 worldNormal;        // only if the shading model is not unlit
        float4 worldPosition;      // always available (see note below about world-space)

        mat4   clipSpaceTransform; // default: identity, transforms the clip-space position, only available for `vertexDomain:device`

        // variable* names are replaced with actual names
        float4 variable0;          // if 1 or more variables is defined
        float4 variable1;          // if 2 or more variables is defined
        float4 variable2;          // if 3 or more variables is defined
        float4 variable3;          // if 4 or more variables is defined
    };

worldPosition

To achieve good precision, the `worldPosition` coordinate in the vertex shader is shifted by the camera position. To get the true world-space position, users can use `getUserWorldPosition()`, however be aware that the true world-position might not be able to fit in a `float` or might be represented with severely reduced precision.

UV attributes

By default the vertex shader of a material will flip the Y coordinate of the UV attributes of the current mesh: `material.uv0 = vec2(mesh_uv0.x, 1.0 - mesh_uv0.y)`. You can control this behavior using the `flipUV` property and setting it to `false`.

### Custom vertex attributes

You can use up to 8 custom vertex attributes, all of type `float4`. These attributes can be accessed using the vertex block shader functions `getCustom0()` to `getCustom7()`. However, before using custom attributes, you _must_ declare those attributes as required in the `requires` property of the material:

    material {
        requires : [
            custom0,
            custom1,
            custom2
        ]
    }

## Fragment block

The fragment block must be used to control the fragment shading stage of the material. The fragment block must contain valid [ESSL 3.0](https://www.khronos.org/registry/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf) code (the version of GLSL supported in OpenGL ES 3.0). You are free to create multiple functions inside the fragment block but you **must** declare the `material` function:

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            // fragment shading code
        }
    }

This function will be invoked automatically at runtime by the shading system and gives you the ability to read and modify material properties using the `MaterialInputs` structure. This full definition of the structure can be found in the [Material fragment inputs](#materialfragmentinputs) section. The full definition of the various members of the structure can be found in the [Material models](#materialmodels) section of this document.

The goal of the `material()` function is to compute the material properties specific to the selected shading model. For instance, here is a fragment block that creates a glossy red metal using the standard lit shading model:

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor.rgb = vec3(1.0, 0.0, 0.0);
            material.metallic = 1.0;
            material.roughness = 0.0;
        }
    }

### prepareMaterial function

Note that you **must** call `prepareMaterial(material)` before exiting the `material()` function. This `prepareMaterial` function sets up the internal state of the material model. Some of the APIs described in the Fragment APIs section - like `shading_normal` for instance - can only be accessed _after_ invoking `prepareMaterial()`.

It is also important to remember that the `normal` property - as described in the Material fragment inputs section - only has an effect when modified _before_ calling `prepareMaterial()`. Here is an example of a fragment shader that properly modifies the `normal` property to implement a glossy red plastic with bump mapping:

    fragment {
        void material(inout MaterialInputs material) {
            // fetch the normal in tangent space
            vec3 normal = texture(materialParams_normalMap, getUV0()).xyz;
            material.normal = normal * 2.0 - 1.0;

            // prepare the material
            prepareMaterial(material);

            // from now on, shading_normal, etc. can be accessed
            material.baseColor.rgb = vec3(1.0, 0.0, 0.0);
            material.metallic = 0.0;
            material.roughness = 1.0;
        }
    }

### Material fragment inputs

    struct MaterialInputs {
        float4 baseColor;           // default: float4(1.0)
        float4 emissive;            // default: float4(0.0, 0.0, 0.0, 1.0)
        float4 postLightingColor;   // default: float4(0.0)

        // no other field is available with the unlit shading model
        float  roughness;           // default: 1.0
        float  metallic;            // default: 0.0, not available with cloth or specularGlossiness
        float  reflectance;         // default: 0.5, not available with cloth or specularGlossiness
        float  ambientOcclusion;    // default: 0.0

        // not available when the shading model is subsurface or cloth
        float3 sheenColor;          // default: float3(0.0)
        float  sheenRoughness;      // default: 0.0
        float  clearCoat;           // default: 1.0
        float  clearCoatRoughness;  // default: 0.0
        float3 clearCoatNormal;     // default: float3(0.0, 0.0, 1.0)
        float  anisotropy;          // default: 0.0
        float3 anisotropyDirection; // default: float3(1.0, 0.0, 0.0)

        // only available when the shading model is subsurface or refraction is enabled
        float  thickness;           // default: 0.5

        // only available when the shading model is subsurface
        float  subsurfacePower;     // default: 12.234
        float3 subsurfaceColor;     // default: float3(1.0)

        // only available when the shading model is cloth
        float3 sheenColor;          // default: sqrt(baseColor)
        float3 subsurfaceColor;     // default: float3(0.0)

        // only available when the shading model is specularGlossiness
        float3 specularColor;       // default: float3(0.0)
        float  glossiness;          // default: 0.0

        // not available when the shading model is unlit
        // must be set before calling prepareMaterial()
        float3 normal;              // default: float3(0.0, 0.0, 1.0)

        // only available when refraction is enabled
        float transmission;         // default: 1.0
        float3 absorption;          // default float3(0.0, 0.0, 0.0)
        float ior;                  // default: 1.5
        float microThickness;       // default: 0.0, not available with refractionType "solid"
    }

### Custom surface shading

When `customSurfaceShading` is set to `true` in the material block, the fragment block **must** declare and implement the `surfaceShading` function:

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            // prepare material inputs
        }

        vec3 surfaceShading(
            const MaterialInputs materialInputs,
            const ShadingData shadingData,
            const LightData lightData
        ) {
            return vec3(1.0); // output of custom lighting
        }
    }

This function will be invoked for every light (directional, spot or point) in the scene that may influence the current fragment. The `surfaceShading` is invoked with 3 sets of data:

- `MaterialInputs`, as described in the [Material fragment inputs](#materialfragmentinputs) section and prepared in the `material` function explained above
- `ShadingData`, a structure containing values derived from `MaterialInputs` (see below)
- `LightData`, a structure containing values specific to the light being currently evaluated (see below)

The `surfaceShading` function must return an RGB color in linear sRGB. Alpha blending and alpha masking are handled outside of this function and must therefore be ignored.

About shadowed fragments

The `surfaceShading` function is invoked even when a fragment is known to be fully in the shadow of the current light (`lightData.NdotL <= 0.0` or `lightData.visibility <= 0.0`). This gives more flexibility to the `surfaceShading` function as it provides a simple way to handle constant ambient lighting for instance.

Shading models

Custom surface shading only works with the `lit` shading model. Attempting to use any other model will result in an error.

#### Shading data structure

    struct ShadingData {
        // The material's diffuse color, as derived from baseColor and metallic.
        // This color is pre-multiplied by alpha and in the linear sRGB color space.
        vec3  diffuseColor;

        // The material's specular color, as derived from baseColor and metallic.
        // This color is pre-multiplied by alpha and in the linear sRGB color space.
        vec3  f0;

        // The perceptual roughness is the roughness value set in MaterialInputs,
        // with extra processing:
        // - Clamped to safe values
        // - Filtered if specularAntiAliasing is enabled
        // This value is between 0.0 and 1.0.
        float perceptualRoughness;

        // The roughness value expected by BRDFs. This value is the square of
        // perceptualRoughness. This value is between 0.0 and 1.0.
        float roughness;
    };

#### Light data structure

    struct LightData {
        // The color (.rgb) and pre-exposed intensity (.w) of the light.
        // The color is an RGB value in the linear sRGB color space.
        // The pre-exposed intensity is the intensity of the light multiplied by
        // the camera's exposure value.
        vec4  colorIntensity;

        // The normalized light vector, in world space (direction from the
        // current fragment's position to the light).
        vec3  l;

        // The dot product of the shading normal (with normal mapping applied)
        // and the light vector. This value is equal to the result of
        // saturate(dot(getWorldSpaceNormal(), lightData.l)).
        // This value is always between 0.0 and 1.0. When the value is <= 0.0,
        // the current fragment is not visible from the light and lighting
        // computations can be skipped.
        float NdotL;

        // The position of the light in world space.
        vec3  worldPosition;

        // Attenuation of the light based on the distance from the current
        // fragment to the light in world space. This value between 0.0 and 1.0
        // is computed differently for each type of light (it's always 1.0 for
        // directional lights).
        float attenuation;

        // Visibility factor computed from shadow maps or other occlusion data
        // specific to the light being evaluated. This value is between 0.0 and
        // 1.0.
        float visibility;
    };

#### Example

The material below shows how to use custom surface shading to implement a simplified toon shader:

    material {
        name : Toon,
        shadingModel : lit,
        parameters : [
            {
                type : float3,
                name : baseColor
            }
        ],
        customSurfaceShading : true
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor.rgb = materialParams.baseColor;
        }

        vec3 surfaceShading(
                const MaterialInputs materialInputs,
                const ShadingData shadingData,
                const LightData lightData
        ) {
            // Number of visible shade transitions
            const float shades = 5.0;
            // Ambient intensity
            const float ambient = 0.1;

            float toon = max(ceil(lightData.NdotL * shades) / shades, ambient);

            // Shadowing and attenuation
            toon *= lightData.visibility * lightData.attenuation;

            // Color and intensity
            vec3 light = lightData.colorIntensity.rgb * lightData.colorIntensity.w;

            return shadingData.diffuseColor * light * toon;
        }
    }

The result can be seen in [figure 41](#figure_toonshading).

[![](../images/screenshot_toon_shading.png)](../images/screenshot_toon_shading.png)

**Figure 41:** simple toon shading implemented with custom
