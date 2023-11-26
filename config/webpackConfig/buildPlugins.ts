import { Configuration, ProgressPlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths } = options;
  const isDevelopment = mode === 'development';

  const plugins: Configuration['plugins'] = [
    // if we don't provide template, plugin will use its own index.html (we don't want that)
    // for now our public/index.html contains id="root" element, we can add css and other files later
    new HTMLWebpackPlugin({ template: paths.html }),
    // to extract styles to a seperate bundle file
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ];

  if (isDevelopment) {
    // WARNING: better not use ProgressPlugin plugin for prod (it can slow down build process)
    plugins.push(new ProgressPlugin());
  }

  return plugins;
}
