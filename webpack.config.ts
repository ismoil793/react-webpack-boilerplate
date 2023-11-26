import path from 'path';
import { buildWebpack } from './config/webpackConfig/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/webpackConfig/types/types';

interface WebPackENVs {
  mode: BuildMode;
  port: number;
}

export default (env: WebPackENVs) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html')
  };

  const buildOptions: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths
  };

  return buildWebpack(buildOptions);
};
