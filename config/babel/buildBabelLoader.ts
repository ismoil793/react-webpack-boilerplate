import { BuildOptions } from '../webpackConfig/types/types';
import { removeDataTestIsmoilBabelPlugin } from './removeDataTestIsmoil';

export function buildBabelLoader(options: BuildOptions) {
    const isDevelopment = options.mode === 'development';
    const isProduciton = options.mode === 'production';

    const babelPlugins = []

    if (isProduciton) {
        babelPlugins.push(
            [
                removeDataTestIsmoilBabelPlugin,
                {
                    props: ['data-testismoil']
                }
            ]
        )
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            // options could also be taken out to separate babel.config.json
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react',
                        {
                            runtime: isDevelopment ? 'automatic' : 'classic'
                        }
                    ]
                ],
                plugins: babelPlugins
            }
        }
    };
}
