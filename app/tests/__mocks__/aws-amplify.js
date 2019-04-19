/**
 * __mocks__/aws-amplify.js
 * AWS Amplify Mocks
 * tests
 */
/* eslint-disable */

export const Auth = {
  currentSession: jest.fn(() => Promise.resolve()),
  currentCredentials: jest.fn(() => Promise.resolve()),
  signIn: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
}
