
## Shader public APIs

### Types

While GLSL types can be used directly (`vec4` or `mat4`) we recommend the use of the following type aliases:

Name

GLSL type

Description

**bool2**

bvec2

A vector of 2 booleans

**bool3**

bvec3

A vector of 3 booleans

**bool4**

bvec4

A vector of 4 booleans

**int2**

ivec2

A vector of 2 integers

**int3**

ivec3

A vector of 3 integers

**int4**

ivec4

A vector of 4 integers

**uint2**

uvec2

A vector of 2 unsigned integers

**uint3**

uvec3

A vector of 3 unsigned integers

**uint4**

uvec4

A vector of 4 unsigned integers

**float2**

float2

A vector of 2 floats

**float3**

float3

A vector of 3 floats

**float4**

float4

A vector of 4 floats

**float4×4**

mat4

A 4×4 float matrix

**float3×3**

mat3

A 3×3 float matrix

### Math

Name

Type

Description

**PI**

float

A constant that represent \\(\\pi\\)

**HALF_PI**

float

A constant that represent \\(\\frac{\\pi}{2}\\)

**saturate(float x)**

float

Clamps the specified value between 0.0 and 1.0

**pow5(float x)**

float

Computes \\(x^5\\)

**sq(float x)**

float

Computes \\(x^2\\)

**max3(float3 v)**

float

Returns the maximum value of the specified `float3`

**mulMat4×4Float3(float4×4 m, float3 v)**

float4

Returns \\(m \* v\\)

**mulMat3×3Float3(float4×4 m, float3 v)**

float4

Returns \\(m \* v\\)

### Matrices

Name

Type

Description

**getViewFromWorldMatrix()**

float4×4

Matrix that converts from world space to view/eye space

**getWorldFromViewMatrix()**

float4×4

Matrix that converts from view/eye space to world space

**getClipFromViewMatrix()**

float4×4

Matrix that converts from view/eye space to clip (NDC) space

**getViewFromClipMatrix()**

float4×4

Matrix that converts from clip (NDC) space to view/eye space

**getClipFromWorldMatrix()**

float4×4

Matrix that converts from world to clip (NDC) space

**getWorldFromClipMatrix()**

float4×4

Matrix that converts from clip (NDC) space to world space

### Frame constants

Name

Type

Description

**getResolution()**

float4

Dimensions of the view's effective (physical) viewport in pixels: `width`, `height`, `1 / width`, `1 / height`. This might be different from `View::getViewport()` for instance because of added rendering guard-bands.

**getWorldCameraPosition()**

float3

Position of the camera/eye in world space (see note below)

**getWorldOffset()**

float3

\[deprecated\] The shift required to obtain API-level world space. Use getUserWorldPosition() instead

**getUserWorldFromWorldMatrix()**

float4×4

Matrix that converts from world space to API-level (user) world space.

**getTime()**

float

Current time as a remainder of 1 second. Yields a value between 0 and 1

**getUserTime()**

float4

Current time in seconds: `time`, `(double)time - time`, `0`, `0`

**getUserTimeMod(float m)**

float

Current time modulo m in seconds

**getExposure()**

float

Photometric exposure of the camera

**getEV100()**

float

[Exposure value at ISO 100](https://en.wikipedia.org/wiki/Exposure_value) of the camera

world space

To achieve good precision, the “world space” in Filament's shading system does not necessarily match the API-level world space. To obtain the position of the API-level camera, custom materials can use `getUserWorldFromWorldMatrix()` to transform `getWorldCameraPosition()`.

### Material globals

Name

Type

Description

**getMaterialGlobal0()**

float4

A vec4 visible by all materials, its value is set by `View::setMaterialGlobal(0, float4)`. Its default value is {0,0,0,1}.

**getMaterialGlobal1()**

float4

A vec4 visible by all materials, its value is set by `View::setMaterialGlobal(1, float4)`. Its default value is {0,0,0,1}.

**getMaterialGlobal2()**

float4

A vec4 visible by all materials, its value is set by `View::setMaterialGlobal(2, float4)`. Its default value is {0,0,0,1}.

**getMaterialGlobal3()**

float4

A vec4 visible by all materials, its value is set by `View::setMaterialGlobal(3, float4)`. Its default value is {0,0,0,1}.

### Vertex only

The following APIs are only available from the vertex block:

Name

Type

Description

**getPosition()**

float4

Vertex position in the domain defined by the material (default: object/model space)

**getCustom0()** to **getCustom7()**

float4

Custom vertex attribute

**getWorldFromModelMatrix()**

float4×4

Matrix that converts from model (object) space to world space

**getWorldFromModelNormalMatrix()**

float3×3

Matrix that converts normals from model (object) space to world space

**getVertexIndex()**

int

Index of the current vertex

**getEyeIndex()**

int

Index of the eye being rendered, starting at 0

### Fragment only

The following APIs are only available from the fragment block:

Name

Type

Description

**getWorldTangentFrame()**

float3×3

Matrix containing in each column the `tangent` (`frame[0]`), `bi-tangent` (`frame[1]`) and `normal` (`frame[2]`) of the vertex in world space. If the material does not compute a tangent space normal for bump mapping or if the shading is not anisotropic, only the `normal` is valid in this matrix.

**getWorldPosition()**

float3

Position of the fragment in world space (see note below about world-space)

**getUserWorldPosition()**

float3

Position of the fragment in API-level (user) world-space (see note below about world-space)

**getWorldViewVector()**

float3

Normalized vector in world space from the fragment position to the eye

**getWorldNormalVector()**

float3

Normalized normal in world space, after bump mapping (must be used after `prepareMaterial()`)

**getWorldGeometricNormalVector()**

float3

Normalized normal in world space, before bump mapping (can be used before `prepareMaterial()`)

**getWorldReflectedVector()**

float3

Reflection of the view vector about the normal (must be used after `prepareMaterial()`)

**getNormalizedViewportCoord()**

float3

Normalized user viewport position (i.e. NDC coordinates normalized to \[0, 1\] for the position, \[1, 0\] for the depth), can be used before `prepareMaterial()`). Because the user viewport is smaller than the actual physical viewport, these coordinates can be negative or superior to 1 in the non-visible area of the physical viewport.

**getNdotV()**

float

The result of `dot(normal, view)`, always strictly greater than 0 (must be used after `prepareMaterial()`)

**getColor()**

float4

Interpolated color of the fragment, if the color attribute is required

**getUV0()**

float2

First interpolated set of UV coordinates, only available if the uv0 attribute is required

**getUV1()**

float2

First interpolated set of UV coordinates, only available if the uv1 attribute is required

**getMaskThreshold()**

float

Returns the mask threshold, only available when `blending` is set to `masked`

**inverseTonemap(float3)**

float3

Applies the inverse tone mapping operator to the specified linear sRGB color and returns a linear sRGB color. This operation may be an approximation and works best with the “Filmic” tone mapping operator

**inverseTonemapSRGB(float3)**

float3

Applies the inverse tone mapping operator to the specified non-linear sRGB color and returns a linear sRGB color. This operation may be an approximation and works best with the “Filmic” tone mapping operator

**luminance(float3)**

float

Computes the luminance of the specified linear sRGB color

**ycbcrToRgb(float, float2)**

float3

Converts a luminance and CbCr pair to a sRGB color

**uvToRenderTargetUV(float2)**

float2

Transforms a UV coordinate to allow sampling from a `RenderTarget` attachment

world-space

To obtain API-level world-space coordinates, custom materials should use `getUserWorldPosition()` or use `getUserWorldFromWorldMatrix()`. Note that API-level world-space coordinates should never or rarely be used because they may not fit in a float3 or have severely reduced precision.

sampling from render targets

When sampling from a `filament::Texture` that is attached to a `filament::RenderTarget` for materials in the surface domain, please use `uvToRenderTargetUV` to transform the texture coordinate. This will flip the coordinate depending on which backend is being used.

# Compiling materials

Material packages can be compiled from material definitions using the command line tool called `matc`. The simplest way to use `matc` is to specify an input material definition (`car_paint.mat` in the example below) and an output material package (`car_paint.filamat` in the example below):

    $ matc -o ./materials/bin/car_paint.filamat ./materials/src/car_paint.mat

## Shader validation

`matc` attempts to validate shaders when compiling a material package. The example below shows an example of an error message generated when compiling a material definition containing a typo in the fragment shader (`metalic` instead of `metallic`). The reported line numbers are line numbers in the source material definition file.

    ERROR: 0:13: 'metalic' : no such field in structure
    ERROR: 0:13: '' : compilation terminated
    ERROR: 2 compilation errors.  No code generated.

    Could not compile material metal.mat

## Flags

The command line flags relevant to application development are described in [table 16](#table_matcflags).

Flag

Value

Usage

**\-o**, **—output**

\[path\]

Specify the output file path

**\-p**, **—platform**

desktop/mobile/all

Select the target platform(s)

**\-a**, **—api**

opengl/vulkan/all

Specify the target graphics API

**\-S**, **—optimize-size**

N/A

Optimize compiled material for size instead of just performance

**\-r**, **—reflect**

parameters

Outputs the specified metadata as JSON

**\-v**, **—variant-filter**

\[variant\]

Filters out the specified, comma-separated variants

**Table 16:** List of `matc` flags

`matc` offers a few other flags that are irrelevant to application developers and for internal use only.

### —platform

By default, `matc` generates material packages containing shaders for all supported platforms. If you wish to reduce the size of your material packages, it is recommended to select only the appropriate target platform. For instance, to compile a material package for Android only, run the following command:

    $ matc -p mobile -o ./materials/bin/car_paint.filamat ./materials/src/car_paint.mat

### —api

By default, `matc` generates material packages containing shaders for the OpenGL API. You can choose to generate shaders for the Vulkan API in addition to the OpenGL shaders. If you intend on targeting only Vulkan capable devices, you can reduce the size of the material packages by generating only the set of Vulkan shaders:

    $ matc -a vulkan -o ./materials/bin/car_paint.filamat ./materials/src/car_paint.mat

### —optimize-size

This flag applies fewer optimization techniques to try and keep the final material as small as possible. If the compiled material is deemed too large by default, using this flag might be a good compromise between runtime performance and size.

### —reflect

This flag was designed to help build tools around `matc`. It allows you to print out specific metadata in JSON format. The example below prints out the list of parameters defined in Filament's standard skybox material. It produces a list of 2 parameters, named `showSun` and `skybox`, respectively a boolean and a cubemap texture.

    $ matc --reflect parameters filament/src/materials/skybox.mat
    {
      "parameters": [
        {
          "name": "showSun",
          "type": "bool",
          "size": "1"
        },
        {
          "name": "skybox",
          "type": "samplerCubemap",
          "format": "float",
          "precision": "default"
        }
      ]
    }

### —variant-filter

This flag can be used to further reduce the size of a compiled material. It is used to specify a list of shader variants that the application guarantees will never be needed. These shader variants are skipped during the code generation phase of `matc`, thus reducing the overall size of the material.

The variants must be specified as a comma-separated list, using one of the following available variants:

- `directionalLighting`, used when a directional light is present in the scene
- `dynamicLighting`, used when a non-directional light (point, spot, etc.) is present in the scene
- `shadowReceiver`, used when an object can receive shadows
- `skinning`, used when an object is animated using GPU skinning or vertex morphing
- `fog`, used when global fog is applied to the scene
- `vsm`, used when VSM shadows are enabled and the object is a shadow receiver
- `ssr`, used when screen-space reflections are enabled in the View

Example:

    --variant-filter=skinning,shadowReceiver

Note that some variants may automatically be filtered out. For instance, all lighting related variants (`directionalLighting`, etc.) are filtered out when compiling an `unlit` material.

When this flag is used, the specified variant filters are merged with the variant filters specified in the material itself.

Use this flag with caution, filtering out a variant required at runtime may lead to crashes.

# Handling colors

## Linear colors

If the color data comes from a texture, simply make sure you use an sRGB texture to benefit from automatic hardware conversion from sRGB to linear. If the color data is passed as a parameter to the material you can convert from sRGB to linear by running the following algorithm on each color channel:

```cpp
    float sRGB_to_linear(float color) {
     return color <= 0.04045 ? color / 12.92 : pow((color + 0.055) / 1.055, 2.4);
    }
```

Alternatively you can use one of the two cheaper but less accurate versions shown below:

```cpp
    // Cheaper
    linearColor = pow(color, 2.2);
    // Cheapest
    linearColor = color * color;
```

## Pre-multiplied alpha

A color uses pre-multiplied alpha if its RGB components are multiplied by the alpha channel:

    // Compute pre-multiplied color
    color.rgb *= color.a;

If the color is sampled from a texture, you can simply ensure that the texture data is pre-multiplied ahead of time. On Android, any texture uploaded from a [Bitmap](https://developer.android.com/reference/android/graphics/Bitmap.html) will be pre-multiplied by default.

# Sampler usage in Materials

The number of usable sampler parameters (e.g.: type is `sampler2d`) in materials is limited and depends on the material properties, shading model, feature level and variant filter.

## Feature level 1 and 2

`unlit` materials can use up to 12 samplers by default.

`lit` materials can use up to 9 samplers by default, however if `refractionMode` or `reflectionMode` is set to `screenspace` that number is reduced to 8.

Finally if `variantFilter` contains the `fog` filter, an extra sampler is made available, such that `unlit` materials can use up to 13 and `lit` materials up to 10 samplers by default.
