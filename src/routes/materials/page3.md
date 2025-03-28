
### General: constants

Type

array of constant objects

Value

Each entry is an object with the properties `name` and `type`, both of `string` type. The name must be a valid GLSL identifier. Entries also have an optional `default`, which can either be a `bool` or `number`, depending on the `type` of the constant. The type must be one of the types described in [table 15](#table_materialconstantstypes).

Type

Description

Default

int

A signed, 32 bit GLSL int

0

float

A single-precision GLSL float

0.0

bool

A GLSL bool

false

**Table 15:** Material constants types

Description

Lists the constant parameters accepted by your material. These constants can be set, or “specialized”, at runtime when loading a material package. Multiple materials can be loaded from the same material package with differing constant parameter specializations. Once a material is loaded from a material package, its constant parameters cannot be changed. Compared to regular parameters, constant parameters allow the compiler to generate more efficient code. Access constant parameters from the shader by prefixing the name with `materialConstant_`. For example, a constant parameter named `myConstant` is accessed in the shader as `materialConstant_myConstant`. If a constant parameter is not set at runtime, the default is used.

    material {
        constants : [
            {
               name : overrideAlpha,
               type : bool
            },
            {
               name : customAlpha,
               type : float,
               default : 0.5
            }
        ],
        shadingModel : lit,
        blending : transparent,
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            if (materialConstants_overrideAlpha) {
                material.baseColor.a = materialConstants_customAlpha;
                material.baseColor.rgb *= material.baseColor.a;
            }
        }
    }

### General: variantFilter

Type

array of `string`

Value

Each entry must be any of `dynamicLighting`, `directionalLighting`, `shadowReceiver`, `skinning`, `ssr`, or `stereo`.

Description

Used to specify a list of shader variants that the application guarantees will never be needed. These shader variants are skipped during the code generation phase, thus reducing the overall size of the material. Note that some variants may automatically be filtered out. For instance, all lighting related variants (`directionalLighting`, etc.) are filtered out when compiling an `unlit` material. Use the variant filter with caution, filtering out a variant required at runtime may lead to crashes.

Description of the variants:

- `directionalLighting`, used when a directional light is present in the scene
- `dynamicLighting`, used when a non-directional light (point, spot, etc.) is present in the scene
- `shadowReceiver`, used when an object can receive shadows
- `skinning`, used when an object is animated using GPU skinning
- `fog`, used when global fog is applied to the scene
- `vsm`, used when VSM shadows are enabled and the object is a shadow receiver
- `ssr`, used when screen-space reflections are enabled in the View
- `stereo`, used when stereoscopic rendering is enabled in the View

    material {
    name : "Invisible shadow plane",
    shadingModel : unlit,
    shadowMultiplier : true,
    blending : transparent,
    variantFilter : [ skinning ]
    }

### General: flipUV

Type

`boolean`

Value

`true` or `false`. Defaults to `true`.

Description

When set to `true` (default value), the Y coordinate of UV attributes will be flipped when read by this material's vertex shader. Flipping is equivalent to `y = 1.0 - y`. When set to `false`, flipping is disabled and the UV attributes are read as is.

    material {
        flipUV : false
    }

### General: quality

Type

`string`

Value

Any of `low`, `normal`, `high`, `default`. Defaults to `default`.

Description

Set some global quality parameters of the material. `low` enables optimizations that can slightly affect correctness and is the default on mobile platforms. `normal` does not affect correctness and is otherwise similar to `low`. `high` enables quality settings that can adversely affect performance and is the default on desktop platforms.

    material {
        quality : default
    }

### General: instanced

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Allows a material to access the instance index (i.e.: **`gl_InstanceIndex`**) of instanced primitives using `getInstanceIndex()` in the material's shader code. Never use **`gl_InstanceIndex`** directly. This is typically used with `RenderableManager::Builder::instances()`. `getInstanceIndex()` is available in both the vertex and fragment shader.

    material {
        instanced : true
    }

### General: vertexDomainDeviceJittered

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Only meaningful for `vertexDomain:Device` materials, this parameter specifies whether the filament clip-space transforms need to be applied or not, which affects TAA and guard bands. Generally it needs to be applied because by definition `vertexDomain:Device` materials vertices are not transformed and used _as is_. However, if the vertex shader uses for instance `getViewFromClipMatrix()` (or other matrices based on the projection), the clip-space transform is already applied. Setting this parameter incorrectly can prevent TAA or the guard bands to work correctly.

    material {
        vertexDomainDeviceJittered : true
    }

### Vertex and attributes: requires

Type

array of `string`

Value

Each entry must be any of `uv0`, `uv1`, `color`, `position`, `tangents`, `custom0` through `custom7`.

Description

Lists the vertex attributes required by the material. The `position` attribute is always required and does not need to be specified. The `tangents` attribute is automatically required when selecting any shading model that is not `unlit`. See the shader sections of this document for more information on how to access these attributes from the shaders.

    material {
        parameters : [
            {
               type : sampler2d,
               name : texture
            },
        ],
        requires : [
            uv0,
            custom0
        ],
        shadingModel : lit,
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor = texture(materialParams_texture, getUV0());
            material.baseColor.rgb *= getCustom0().rgb;
        }
    }

### Vertex and attributes: variables

Type

array of `string`

Value

Up to 4 strings, each must be a valid GLSL identifier.

Description

Defines custom interpolants (or variables) that are output by the material's vertex shader. Each entry of the array defines the name of an interpolant. The full name in the fragment shader is the name of the interpolant with the `variable_` prefix. For instance, if you declare a variable called `eyeDirection` you can access it in the fragment shader using `variable_eyeDirection`. In the vertex shader, the interpolant name is simply a member of the `MaterialVertexInputs` structure (`material.eyeDirection` in your example). Each interpolant is of type `float4` (`vec4`) in the shaders. By default the precision of the interpolant is `highp` in _both_ the vertex and fragment shaders. An alternate syntax can be used to specify both the name and precision of the interpolant. In this case the specified precision is used as-is in both fragment and vertex stages, in particular if `default` is specified the default precision is used is the fragment shader (`mediump`) and in the vertex shader (`highp`).

    material {
        name : Skybox,
        parameters : [
            {
               type : samplerCubemap,
               name : skybox
            }
        ],
        variables : [
             eyeDirection,
             {
                name : eyeColor,
                precision : medium
             }
        ],
        vertexDomain : device,
        depthWrite : false,
        shadingModel : unlit
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            float3 sky = texture(materialParams_skybox, variable_eyeDirection.xyz).rgb;
            material.baseColor = vec4(sky, 1.0);
        }
    }

    vertex {
        void materialVertex(inout MaterialVertexInputs material) {
            float3 p = getPosition().xyz;
            float3 u = mulMat4x4Float3(getViewFromClipMatrix(), p).xyz;
            material.eyeDirection.xyz = mulMat3x3Float3(getWorldFromViewMatrix(), u);
        }
    }

### Vertex and attributes: vertexDomain

Type

`string`

Value

Any of `object`, `world`, `view`, `device`. Defaults to `object`.

Description

Defines the domain (or coordinate space) of the rendered mesh. The domain influences how the vertices are transformed in the vertex shader. The possible domains are:

- **Object**: the vertices are defined in the object (or model) coordinate space. The vertices are transformed using the rendered object's transform matrix
- **World**: the vertices are defined in world coordinate space. The vertices are not transformed using the rendered object's transform.
- **View**: the vertices are defined in view (or eye or camera) coordinate space. The vertices are not transformed using the rendered object's transform.
- **Device**: the vertices are defined in normalized device (or clip) coordinate space. The vertices are not transformed using the rendered object's transform.

    material {
    vertexDomain : device
    }

### Vertex and attributes: interpolation

Type

`string`

Value

Any of `smooth`, `flat`. Defaults to `smooth`.

Description

Defines how interpolants (or variables) are interpolated between vertices. When this property is set to `smooth`, a perspective correct interpolation is performed on each interpolant. When set to `flat`, no interpolation is performed and all the fragments within a given triangle will be shaded the same.

    material {
        interpolation : flat
    }

### Blending and transparency: blending

Type

`string`

Value

Any of `opaque`, `transparent`, `fade`, `add`, `masked`, `multiply`, `screen`, `custom`. Defaults to `opaque`.

Description

Defines how/if the rendered object is blended with the content of the render target. The possible blending modes are:

- **Opaque**: blending is disabled, the alpha channel of the material's output is ignored.
- **Transparent**: blending is enabled. The material's output is alpha composited with the render target, using Porter-Duff's `source over` rule. This blending mode assumes pre-multiplied alpha.
- **Fade**: acts as `transparent` but transparency is also applied to specular lighting. In `transparent` mode, the material's alpha values only applies to diffuse lighting. This blending mode is useful to fade lit objects in and out.
- **Add**: blending is enabled. The material's output is added to the content of the render target.
- **Multiply**: blending is enabled. The material's output is multiplied with the content of the render target, darkening the content.
- **Screen**: blending is enabled. Effectively the opposite of the `multiply`, the content of the render target is brightened.
- **Masked**: blending is disabled. This blending mode enables alpha masking. The alpha channel of the material's output defines whether a fragment is discarded or not. Additionally, ALPHA_TO_COVERAGE is enabled for non-translucent views. See the maskThreshold section for more information.
- **Custom**: blending is enabled. But the blending function is user specified. See `blendFunction`.

When `blending` is set to `masked`, alpha to coverage is automatically enabled for the material. If this behavior is undesirable, refer to the [Rasterization: alphaToCoverage](#rasterization:alphatocoverage) section to turn alpha to coverage off using the `alphaToCoverage` property.

    material {
        blending : transparent
    }

### Blending and transparency: blendFunction

Type

`object`

Fields

`srcRGB`, `srcA`, `dstRGB`, `dstA`

Description

\- _srcRGB_: source function applied to the RGB channels - _srcA_: source function applied to the alpha channel - _srcRGB_: destination function applied to the RGB channels - _srcRGB_: destination function applied to the alpha channel The values possible for each functions are one of `zero`, `one`, `srcColor`, `oneMinusSrcColor`, `dstColor`, `oneMinusDstColor`, `srcAlpha`, `oneMinusSrcAlpha`, `dstAlpha`, `oneMinusDstAlpha`, `srcAlphaSaturate`

    material {
        blending : custom,
        blendFunction :
        {
            srcRGB: one,
            srcA: one,
            dstRGB: oneMinusSrcColor,
            dstA: oneMinusSrcAlpha
        }
     }

### Blending and transparency: postLightingBlending

Type

`string`

Value

Any of `opaque`, `transparent`, `add`. Defaults to `transparent`.

Description

Defines how the `postLightingColor` material property is blended with the result of the lighting computations. The possible blending modes are:

- **Opaque**: blending is disabled, the material will output `postLightingColor` directly.
- **Transparent**: blending is enabled. The material's computed color is alpha composited with the `postLightingColor`, using Porter-Duff's `source over` rule. This blending mode assumes pre-multiplied alpha.
- **Add**: blending is enabled. The material's computed color is added to `postLightingColor`.
- **Multiply**: blending is enabled. The material's computed color is multiplied with `postLightingColor`.
- **Screen**: blending is enabled. The material's computed color is inverted and multiplied with `postLightingColor`, and the result is added to the material's computed color.

    material {
    postLightingBlending : add
    }

### Blending and transparency: transparency

Type

`string`

Value

Any of `default`, `twoPassesOneSide` or `twoPassesTwoSides`. Defaults to `default`.

Description

Controls how transparent objects are rendered. It is only valid when the `blending` mode is not `opaque` and `refractionMode` is `none`. None of these methods can accurately render concave geometry, but in practice they are often good enough.

The three possible transparency modes are:

- `default`: the transparent object is rendered normally (as seen in [figure 33](#figure_transparencydefault)), honoring the `culling` mode, etc.
- `twoPassesOneSide`: the transparent object is first rendered in the depth buffer, then again in the color buffer, honoring the `culling` mode. This effectively renders only half of the transparent object as shown in [figure 34](#figure_transparencytwopassesoneside).
- `twoPassesTwoSides`: the transparent object is rendered twice in the color buffer: first with its back faces, then with its front faces. This mode lets you render both set of faces while reducing or eliminating sorting issues, as shown in [figure 35](#figure_transparencytwopassestwosides). `twoPassesTwoSides` can be combined with `doubleSided` for better effect.

    material {
    transparency : twoPassesOneSide
    }

[![](../images/screenshot_transparency_default.png)](../images/screenshot_transparency_default.png)

**Figure 33:** This double sided model shows the type of sorting issues transparent

[![](../images/screenshot_twopasses_oneside.png)](../images/screenshot_twopasses_oneside.png)

**Figure 34:** In `twoPassesOneSide` mode, only one set of faces is visible

[![](../images/screenshot_twopasses_twosides.png)](../images/screenshot_twopasses_twosides.png)

**Figure 35:** In `twoPassesTwoSides` mode, both set of faces are visible

### Blending and transparency: maskThreshold

Type

`number`

Value

A value between `0.0` and `1.0`. Defaults to `0.4`.

Description

Sets the minimum alpha value a fragment must have to not be discarded when the `blending` mode is set to `masked`. If the fragment is not discarded, its source alpha is set to 1. When the blending mode is not `masked`, this value is ignored. This value can be used to controlled the appearance of alpha-masked objects.

    material {
        blending : masked,
        maskThreshold : 0.5
    }

### Blending and transparency: refractionMode

Type

`string`

Value

Any of `none`, `cubemap`, `screenspace`. Defaults to `none`.

Description

Activates refraction when set to anything but `none`. A value of `cubemap` will only use the IBL cubemap as source of refraction, while this is significantly more efficient, no scene objects will be refracted, only the distant environment encoded in the cubemap. This mode is adequate for an object viewer for instance. A value of `screenspace` will employ the more advanced screen-space refraction algorithm which allows opaque objects in the scene to be refracted. In `cubemap` mode, refracted rays are assumed to emerge from the center of the object and the `thickness` parameter is only used for computing the absorption, but has no impact on the refraction itself. In `screenspace` mode, refracted rays are assumed to travel parallel to the view direction when they exit the refractive medium.

    material {
        refractionMode : cubemap,
    }

### Blending and transparency: refractionType

Type

`string`

Value

Any of `solid`, `thin`. Defaults to `solid`.

Description

This is only meaningful when `refractionMode` is set to anything but `none`. `refractionType` defines the refraction model used. `solid` is used for thick objects such as a crystal ball, an ice cube or as sculpture. `thin` is used for thin objects such as a window, an ornament ball or a soap bubble. In `solid` mode all refracive objects are assumed to be a sphere tangent to the entry point and of radius `thickness`. In `thin` mode, all refractive objects are assumed to be flat and thin and of thickness `thickness`.

    material {
        refractionMode : cubemap,
        refractionType : thin,
    }

### Rasterization: culling

Type

`string`

Value

Any of `none`, `front`, `back`, `frontAndBack`. Defaults to `back`.

Description

Defines which triangles should be culled: none, front-facing triangles, back-facing triangles or all.

    material {
        culling : none
    }

### Rasterization: colorWrite

Type

`boolean`

Value

`true` or `false`. Defaults to `true`.

Description

Enables or disables writes to the color buffer.

    material {
        colorWrite : false
    }

### Rasterization: depthWrite

Type

`boolean`

Value

`true` or `false`. Defaults to `true` for opaque materials, `false` for transparent materials.

Description

Enables or disables writes to the depth buffer.

    material {
        depthWrite : false
    }

### Rasterization: depthCulling

Type

`boolean`

Value

`true` or `false`. Defaults to `true`.

Description

Enables or disables depth testing. When depth testing is disabled, an object rendered with this material will always appear on top of other opaque objects.

    material {
        depthCulling : false
    }

### Rasterization: doubleSided

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Enables two-sided rendering and its capability to be toggled at run time. When set to `true`, `culling` is automatically set to `none`; if the triangle is back-facing, the triangle's normal is flipped to become front-facing. When explicitly set to `false`, this allows the double-sidedness to be toggled at run time.

    material {
        name : "Double sided material",
        shadingModel : lit,
        doubleSided : true
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor = materialParams.albedo;
        }
    }

### Rasterization: alphaToCoverage

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Enables or disables alpha to coverage. When alpha to coverage is enabled, the coverage of fragment is derived from its alpha. This property is only meaningful when MSAA is enabled. Note: setting `blending` to `masked` automatically enables alpha to coverage. If this is not desired, you can override this behavior by setting alpha to coverage to false as in the example below.

    material {
        name : "Alpha to coverage",
        shadingModel : lit,
        blending : masked,
        alphaToCoverage : false
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor = materialParams.albedo;
        }
    }

### Lighting: reflections

Type

`string`

Value

`default` or `screenspace`. Defaults to `default`.

Description

Controls the source of specular reflections for this material. When this property is set to `default`, reflections only come image-based lights. When this property is set to `screenspace`, reflections come from the screen space's color buffer in addition to image-based lights.

    material {
        name : "Glossy metal",
        reflections : screenspace
    }

### Lighting: shadowMultiplier

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Only available in the `unlit` shading model. If this property is enabled, the final color computed by the material is multiplied by the shadowing factor (or visibility). This allows to create transparent shadow-receiving objects (for instance an invisible ground plane in AR). This is only supported with shadows from directional lights.

    material {
        name : "Invisible shadow plane",
        shadingModel : unlit,
        shadowMultiplier : true,
        blending : transparent
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            // baseColor defines the color and opacity of the final shadow
            material.baseColor = vec4(0.0, 0.0, 0.0, 0.7);
        }
    }

### Lighting: transparentShadow

Type

`boolean`

Value

`true` or `false`. Defaults to `false`.

Description

Enables transparent shadows on this material. When this feature is enabled, Filament emulates transparent shadows using a dithering pattern: they work best with variance shadow maps (VSM) and blurring enabled. The opacity of the shadow derives directly from the alpha channel of the material's `baseColor` property. Transparent shadows can be enabled on opaque objects, making them compatible with refractive/transmissive objects that are otherwise considered opaque.

    material {
        name : "Clear plastic with stickers",
        transparentShadow : true,
        blending : transparent,
        // ...
    }

    fragment {
        void material(inout MaterialInputs material) {
            prepareMaterial(material);
            material.baseColor = texture(materialParams_baseColor, getUV0());
        }
    }

[![](../images/screenshot_transparent_shadows.jpg)](../images/screenshot_transparent_shadows.jpg)

**Figure 36:** Objects rendered with transparent shadows and blurry VSM with a
