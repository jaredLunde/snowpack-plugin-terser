<hr/>

# snowpack-plugin-terser

> Use Terser to minify JavaScript in production Snowpack apps

```sh
# NOTE: terser is a peer dependency
npm i terser snowpack-plugin-terser
```

<p>
  <a aria-label="Types" href="https://www.npmjs.com/package/snowpack-plugin-terser">
    <img alt="Types" src="https://img.shields.io/npm/types/snowpack-plugin-terser?style=for-the-badge&labelColor=24292e">
  </a>
  <!--
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/snowpack-plugin-terser">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/snowpack-plugin-terser?style=for-the-badge&labelColor=24292e">
  </a>
  -->
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/snowpack-plugin-terser">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/snowpack-plugin-terser?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/snowpack-plugin-terser">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/snowpack-plugin-terser?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/snowpack-plugin-terser?style=for-the-badge&labelColor=24292e">
  </a>
</p>

---

## Why do this?

While Snowpack has a `minify` option built in, it only uses `esbuild`'s minification.
In doing so it misses many optimizations that are caught by [Terser](https://github.com/terser/terser).

## When to use this

You should only use this if you aren't already using a bundler (Webpack, Parcel, Rollup) to
build your production site.

## Quick start

```js
// snowpack.config.js
module.exports = {
  buildOptions: {
    minify: false,
  },
  plugins: [
    [
      'snowpack-plugin-terser',
      {
        /**
         * @see Plugin Options below
         */
        terserOptions: {
          compress: {
            arguments: true,
            passes: 2,
            unsafe_arrows: true,
          },
        },
      },
    ],
  ],
}
```

## Plugin Options

```ts
export interface SnowpackPluginTerserOptions {
  /**
   * An array of glob patterns for files you want to explicitly include
   * for Terser minification. By default, all JavaScript files are included.
   */
  include?: string[]
  /**
   * An array of glob patterns for files you want to exclude from
   * Terser minification
   */
  exclude?: string[]
  /**
   * Terser minify() options passed directly to Terser
   * @see https://github.com/terser/terser#minify-options
   *
   * @default {
   *   module: true,
   *   toplevel: true,
   *   compress: {
   *     ecma: 2016,
   *   },
   *   format: {
   *     ecma: 2016
   *   }
   * }
   */
  terserOptions?: terser.MinifyOptions
}
```

## LICENSE

MIT
