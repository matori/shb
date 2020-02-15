const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const preprocess = require("svelte-preprocess")

const mockServer = require("./scripts/server")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"

module.exports = {
  entry: {
    bundle: ["./src/app/index.js"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
      "~": path.resolve(__dirname, "src", "app"),
    },
    extensions: [".mjs", ".js", ".ts", ".svelte", ".json"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: `${__dirname}/public`,
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: [
              preprocess({
                markupTagName: "template",
                preserve: ["ld+json"],
                scss: {
                  data: `@import "${path.resolve(__dirname, "src", "app", "assets", "styles", "base.scss")}";`,
                  sourceMap: !prod,
                },
                postcss: {
                  plugins: [require("autoprefixer")],
                  map: !prod,
                },
              }),
            ],
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["lodash", "@babel/plugin-proposal-optional-chaining"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: !prod,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              removeSVGTagAttrs: false,
            },
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [{ removeXMLNS: true }, { removeViewBox: false }],
            },
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new Dotenv({
      path: `./env/.env.${process.env.API_MODE || "production"}`,
    }),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: prod
        ? {
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            useShortDoctype: true,
          }
        : false,
    }),
    new CopyPlugin([{ from: "./src/static" }]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  devtool: prod ? false : "eval-source-map",
  devServer: {
    port: 3000,
    before: function(app, server, compiler) {
      mockServer(app)
    },
  },
}
