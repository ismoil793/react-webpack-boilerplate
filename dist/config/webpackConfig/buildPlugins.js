import { DefinePlugin, ProgressPlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
export function buildPlugins(options) {
    var mode = options.mode, paths = options.paths, analyzer = options.analyzer;
    var isDevelopment = mode === 'development';
    var plugins = [
        // if we don't provide template, plugin will use its own index.html (we don't want that)
        // for now our public/index.html contains id="root" element, we can add css and other files later
        new HTMLWebpackPlugin({ template: paths.html }),
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
    }
    if (analyzer) {
        // webpack bundle analyzer
        plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
}
