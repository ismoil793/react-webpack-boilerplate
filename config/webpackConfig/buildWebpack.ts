import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths } = options;
  const isDevelopment = mode === 'development';

  return {
    // dev mode provides readability (comments)
    // prod mode compresses all code to 1 line without comments
    // look at package.json (build:dev, build:prod)
    mode: mode ?? 'production',
    // path to entry file (where our code starts)
    entry: paths.entry,
    output: {
      // where to keep the result
      path: paths.output,
      // name of bundled js file (should be hashed bcs browsers cache js files with same name)
      // name by default is "main", contenthash generate from the content
      // (every time you make some changes contenthash will be different)
      filename: '[name].[contenthash].js',
      // cleans build folder of all files before the start of new build
      clean: true
    },
    // additional plugins are added here
    plugins: buildPlugins(options),
    // filter above removes false, undefined, null (for example we will have false in the plugins array for ProgressPlugin in prod mode)
    module: {
      // webpack has loaders (css, js, ts, less, scss)
      // order of loaders is very important
      // having style-loader - css loader - scss loader
      // we should load them in the order scss->css->style loaders
      // scss becomes css, css gets imported, then its injected and applied to the DOM nodes
      rules: buildLoaders(options)
    },
    // resolves extensions when importing from files
    resolve: {
      // we can import ts files like so: import {a} from 'a', instead of import {a} from 'a.ts'
      extensions: ['.tsx', '.ts', '.js']
    },
    devServer: isDevelopment ? buildDevServer(options) : undefined,
    // helps to generate source map of project
    // to find stack trace of where the error happened
    devtool: isDevelopment ? 'inline-source-map' : false
  };
}
