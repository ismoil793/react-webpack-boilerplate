import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, analyzer } = options;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  const plugins: Configuration['plugins'] = [
    // if we don't provide template, plugin will use its own index.html (we don't want that)
    // for now our public/index.html contains id="root" element, we can add css and other files later
    new HTMLWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.publicFolder, 'favicon.ico') }),
    // to extract styles to a seperate bundle file
    // otherwise all styles will be included to js bundle
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new DefinePlugin({
      __ISMOIL_GLOBAL__: JSON.stringify('Test')
    })
  ];

  if (isDevelopment) {
    // WARNING: better not use ProgressPlugin plugin for prod (it can slow down build process)
    plugins.push(new ProgressPlugin());
    // improves performance since ts type checking is done in another process
    plugins.push(new ForkTsCheckerWebpackPlugin());
    // hot module reload (HMR)
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (analyzer) {
    // webpack bundle analyzer
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProduction) {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: path.resolve(paths.publicFolder, 'locales'), to: path.resolve(paths.output, 'locales') }]
      })
    );
  }

  return plugins;
}
