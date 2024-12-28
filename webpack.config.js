const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'module-adaptor-testing',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    resolve: {
        fallback: { "util": false },
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match JavaScript files
                loader: 'babel-loader',
                exclude: /node_modules/, // Exclude all node_modules by default
                include: [
                    path.resolve(__dirname, 'src'), // Include your source code
                    path.resolve(__dirname, 'node_modules/sinon'), // Include the specific module
                ],
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: '> 0.25%, not dead', // Adjust target browsers as needed
                            },
                        ],
                    ],
                },
            },
        ],
    },
};

const unminifiedConfig = {
    ...baseConfig,
    mode: 'development',
    output: {
        ...baseConfig.output,
        filename: 'library.js', // Filename for unminified version
    },
};

const minifiedConfig = {
    ...baseConfig,
    mode: 'production',
    output: {
        ...baseConfig.output,
        filename: 'library.min.js', // Filename for minified version
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};

module.exports = [unminifiedConfig, minifiedConfig];
// module.exports = {
//     entry: './src/index.js', // Your entry file
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'library.js', // Default filename for the unminified version
//         library: 'module-adaptor-testing', // Replace with your library name
//         globalObject: 'this', // Ensures compatibility in both Node.js and browsers
//         libraryTarget: 'umd', // Export as a UMD module for compatibility
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/, // Match JavaScript files
//                 loader: 'babel-loader',
//                 exclude: /node_modules/, // Exclude all node_modules by default
//                 include: [
//                     path.resolve(__dirname, 'src'), // Include your source code
//                     path.resolve(__dirname, 'node_modules/sinon'), // Include the specific module
//                 ],
//                 options: {
//                     presets: [
//                         [
//                             '@babel/preset-env',
//                             {
//                                 targets: '> 0.25%, not dead', // Adjust target browsers as needed
//                             },
//                         ],
//                     ],
//                 },
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.js'], // Resolve these extensions
//         fallback: { "util": false },
//     },
//     mode: 'production', // Use "production" or "development"
//     devtool: 'source-map', // Generate source maps for easier debugging
//     optimization: {
//         minimize: true, // Minimize output bundle
//         splitChunks: {
//             chunks: 'all', // Split code into smaller chunks if needed
//         },
//     },
// };
