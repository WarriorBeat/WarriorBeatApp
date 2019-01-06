/**
 * testenv.js
 * Setup File for Jest Tests
 * tests
 */

/* eslint-disable */

import Adapter from "enzyme-adapter-react-16"
import { configure } from "enzyme"

// Setup Enzyme Adapter
configure({ adapter: new Adapter() })

// Mock RN-Device-Info
jest.mock("react-native-device-info", () => ({
  getUniqueID: jest.fn(),
}))

// Mock Ui Store
jest.mock("stores/uiStore", () => {
  return jest.fn().mockImplementation(() => ({
    goBack: jest.fn(),
  }))
})
