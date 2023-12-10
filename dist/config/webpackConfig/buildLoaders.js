import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
export function buildLoaders(options) {
    var isDevelopment = options.mode === 'development';
    var scssLoader = {
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
    };
    var tsLoader = {
        // we process ts and tsx files
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader', // installed in our package.json
                options: {
                    // this will improve performance of build time for local dev as well as production
                    // when set to true ts errors won't be treated as thrown errors
                    // we can tsc a separate type checking pipeline 
                    transpileOnly: true
                }
            }
        ],
        exclude: /node_modules/
    };
    // load images, for svgs we will use a library
    var assetLoader = {
        test: /\.(png|jpg|jpeg|gif|heic)/i,
        type: 'asset/resource'
    };
    // for svgs, it allows using svgs as React components
    // we can do <SvgIco /> instead of <img src={SvgIco} />
    var svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [{ name: 'convertColors', params: { currentColor: true } }]
                    }
                }
            }
        ]
    };
    return [
        scssLoader,
        tsLoader,
        assetLoader,
        svgLoader
    ];
}
