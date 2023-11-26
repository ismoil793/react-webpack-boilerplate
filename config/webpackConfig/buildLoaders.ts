import { ModuleOptions } from 'webpack';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDevelopment = options.mode === 'development';

  return [
    {
      test: /\.(sa|sc|c)ss$/,
      // use: ['style-loader', 'css-loader', 'sass-loader']

      // order is important here (processing goes from end to start)
      // MiniCSSExtractPlugin.loader already includes 'style-loader'
      use: [
        MiniCSSExtractPlugin.loader,
        // css-loader enables importing CSS into JavaScript, resolving @import and url()
        // it also does style isolation by generating hash names for classNames when using modules
        {
          loader: 'css-loader',
          options: {
            modules: {
              // we can customize the className generation
              localIdentName: isDevelopment ? 'is-dev-[hash:base64:8]' : '[hash:base64:8]'
              // example dev generated this .is-dev-SJL4N9xy {background-color: blue}
              // prod generated this .SJL4N9xy{background-color:blue}

              // another example [path][name]__[local] (good for development mode)
              // generates "src-components-AnotherStyles-module__blue"
            }
          }
        },
        'sass-loader'
      ]
    },
    {
      // we process ts and tsx files
      test: /\.tsx?$/,
      // installed in our package.json
      use: 'ts-loader',
      exclude: /node_modules/
    }
  ];
}
