/**
 * __tests__/AuthorCard.test.js
 * Component Test
 * tests
 */
/* eslint-disable */

import React from "react"
import { render, fireEvent } from "react-native-testing-library"
import AuthorCard from "../AuthorCard"
import Providers, { Data, store } from "tests"
import { TouchableHighlight } from "react-native"

test("should render correctly", () => {
  const tree = render(
    <Providers>
      <AuthorCard author={Data.author()} />
    </Providers>,
  )
  expect(tree).toMatchSnapshot()
})

test("should open author page", () => {
  const author = Data.author()
  const { getByType } = render(
    <Providers>
      <AuthorCard author={author} />
    </Providers>,
  )
  fireEvent(getByType(TouchableHighlight), "press")
  expect(store.uiStore.push).toHaveBeenCalledWith("Author.Profile", author.id, { author })
})
