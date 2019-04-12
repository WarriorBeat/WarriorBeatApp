/**
 * __tests__/environ.js
 * Component Test
 * tests
 */
/* eslint-disable */

// React Native Device Info
jest.doMock("react-native-device-info", () => ({
  getUniqueID: jest.fn(),
}))
