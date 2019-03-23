module.exports = {
  presets: ["module:metro-react-native-babel-preset", "module:react-native-dotenv"],
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
    ["functional-hmr"],
  ],
}
