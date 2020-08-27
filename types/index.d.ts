import * as terser from 'terser'
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
