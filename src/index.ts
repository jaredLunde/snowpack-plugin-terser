import {promises as fs} from 'fs'
import {promisify} from 'util'
import glob_ from 'glob'
import * as terser from 'terser'
import {createFilter} from '@rollup/pluginutils'
const glob = promisify(glob_)

module.exports = function plugin(
  _: any,
  {terserOptions, include, exclude}: SnowpackPluginTerserOptions = {}
) {
  const nameCache = {}
  const filter = createFilter(include, exclude)

  return {
    name: 'snowpack-plugin-terser',
    async optimize({buildDirectory}: {buildDirectory: string}) {
      const files = await glob('**/*.js', {
        cwd: buildDirectory,
        absolute: true,
      })

      const fileContents = await Promise.all(
        files
          .filter((file) => filter(file))
          .map((file) => fs.readFile(file, 'utf-8'))
      )

      const mins = await Promise.all(
        files.map((file, i) =>
          terser.minify(fileContents[i], {
            module: true,
            toplevel: true,
            nameCache,
            ...terserOptions,
            compress: {
              ecma: 2016,
              ...(typeof terserOptions?.compress === 'boolean'
                ? null
                : terserOptions?.compress),
            },
            format: {
              comments: false,
              ecma: 2016,
              ...terserOptions?.format,
            },
          })
        )
      )

      await Promise.all(
        mins.map((result, i) =>
          result.code ? fs.writeFile(files[i], result.code) : Promise.resolve()
        )
      )
    },
  }
}

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
