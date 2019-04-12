module.exports = {
  presets: ["module:metro-react-native-babel-preset", "module:react-native-dotenv"],
  env: {
    development: {
      plugins: [["functional-hmr"]],
    },
  },
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: false,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./app"],
      },
    ],
    ["lodash"],
  ],
}
