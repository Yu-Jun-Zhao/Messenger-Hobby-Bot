const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./server.js",
  target: "node",
  externals: [nodeExternals()],
  // module: {
  //   rules: [
  //     {
  //       // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
  //       test: /\.tsx?$/,
  //       use: "ts-loader",
  //       exclude: /node_modules/
  //     }
  //   ]
  // },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
