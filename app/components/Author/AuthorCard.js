/**
 * AuthorCard.js
 * Author Card Component
 * components/Author
 */

import React from "react"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { PropTypes as gqlTypes } from "graphql"
import { Row, Col } from "components/Layout"
import Image from "react-native-fast-image"
import { StyleSheet, TouchableHighlight } from "react-native"
import { Shape, Colors } from "components/styles"
import { Typo } from "components/Text"

const styles = StyleSheet.create({
  image: {
    ...Shape.rect("30%", "26%", 6),
    elevation: 7,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: Colors.get("ios.gray"),
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
})

const AuthorCard = inject("uiStore")(
  observer(({ author, uiStore }) => {
    const {
      profileImage, title, name, id,
    } = author
    const authorName = name.replace(" ", "\n")
    return (
      <Row height="20%" width="100%" vPad="2%" vMargin="5%">
        <Col center="end">
          <TouchableHighlight
            underlayColor="#fff"
            onPress={() => uiStore.push("Author.Profile", id, { author })}
          >
            <Image
              source={{ uri: profileImage.url }}
              style={styles.image}
              resizeMode={Image.resizeMode.cover}
            />
          </TouchableHighlight>
        </Col>
        <Col hPad="4.5%">
          <Row hPad="4%" size={2} width="50%" center="center" justify="flex-start">
            <Typo.TitleBlack>{authorName}</Typo.TitleBlack>
          </Row>
          <Row hPad="4%" size={1}>
            <Typo.SubtitleBlack>{title}</Typo.SubtitleBlack>
          </Row>
        </Col>
      </Row>
    )
  }),
)

AuthorCard.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

AuthorCard.propTypes = {
  author: gqlTypes.author.isRequired,
}

export default AuthorCard
