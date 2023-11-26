// this import is necessary cuz webpack doesn't have devServer proerty by default, this will add it to it
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true // open when run
  };
}
