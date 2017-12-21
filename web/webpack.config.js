const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const publicPath = "/";

const baseConfig = {
    entry: {
        web: [
            "babel-polyfill",
            "whatwg-fetch",
            path.resolve(__dirname, "src/index.tsx"),
        ],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"]
    },
    devServer: {
        port: 7777,
        host: "localhost",
        historyApiFallback: true,
        noInfo: false,
        contentBase: path.resolve(__dirname, "public"),
        publicPath
    },
    module: {
        rules: [
            {
                test: /.[tj]sx?$/,
                use: [
                    {
                        loader: "cache-loader",
                        options: {
                            cacheDirectory: path.resolve(__dirname, "./build/.cache")
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // This aliases 'react-native' to 'react-native-web' and includes only
                            // the modules needed by the app.
                            plugins: ['react-native-web/babel', 'transform-runtime'],
                            presets: ['react-native']
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "cache-loader",
                            options: {
                                cacheDirectory: path.resolve("build/.cache")
                            }
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins() {
                                    return [
                                        autoprefixer({ browsers: "last 5 versions" }),
                                    ];
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                }),
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Sound Track",
            filename: "index.html",
            template: path.resolve(__dirname, "index.html"),
        }),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest"
        }),
        new NpmInstallPlugin({
            dev: false,
            peerDependencies: true,
        })
    ],
};

const devConfig = {
    devtool: "source-map",
    output: {
        filename: "assets/web.js",
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "assets/style.css",
            allChunks: true,
        }),
    ]
};

const prodConfig = {
    output: {
        filename: "assets/[name]-[chunkhash].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new ExtractTextPlugin({
            filename: "assets/style-[contenthash].css",
            allChunks: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
            },
            sourceMap: true,
            comments: false,
        }),
    ],
};

module.exports = env =>
    (env || "").toLowerCase() === "prod"
        ? merge(baseConfig, prodConfig)
        : merge(baseConfig, devConfig);
