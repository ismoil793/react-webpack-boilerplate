export function buildDevServer(options) {
    var _a;
    return {
        port: (_a = options.port) !== null && _a !== void 0 ? _a : 3000,
        open: true, // open when run
        // index.html will be served for any paths since we're using SPA (React)
        // this is only for development in prod, smth similar must be done for Nginx settings
        historyApiFallback: true
    };
}
