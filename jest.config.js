// jest.config.js
module.exports = {
  preset: "react-native",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
  transform: {
    "^.+\\.(js|tsx?)$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  cacheDirectory: ".jest/cache",
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-navigation|react-native-device-info)/",
  ],
  setupFiles: ["./testenv.js"],
}
