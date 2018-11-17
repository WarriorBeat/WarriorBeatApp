/**
 * GenericPost.js
 * Generic Layout for different Posts
 * components
 */

import React from "react"
import { ScrollView } from "react-native"
import { styles } from "./styles"
import RenderHTML from "react-native-render-html"

export const HTML = props => {
  return <RenderHTML baseFontStyle={styles.html_font} {...props} />
}

class GenericPost extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.scroll_container}
        style={styles.container}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}

export default GenericPost
