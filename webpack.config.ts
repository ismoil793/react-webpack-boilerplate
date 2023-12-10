import path from 'path';
import { buildWebpack } from './config/webpackConfig/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/webpackConfig/types/types';

interface WebPackENVs {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: WebPackENVs) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    publicFolder: path.resolve(__dirname, 'public')
  };

  const buildOptions: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer ?? false,
    paths
  };

  return buildWebpack(buildOptions);
};
