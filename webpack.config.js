const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./server.js",
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
