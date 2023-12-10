// this import is necessary cuz webpack doesn't have devServer proerty by default, this will add it to it
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true, // open when run
    // index.html will be served for any paths since we're using SPA (React)
    // this is only for development in prod, smth similar must be done for Nginx settings
    historyApiFallback: true,
    hot: true // hot module replacement (will not reload browser if changes are made in codebase)
  };
}
