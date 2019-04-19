/**
 * __mocks__/react-native-device-info.js
 * mocks
 */
/* eslint-disable */
jest.doMock("react-native-device-info", () => ({
  getUniqueID: jest.fn(),
}))
