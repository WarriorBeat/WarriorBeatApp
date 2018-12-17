/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { Tile, Avatar } from "react-native-elements"
import { Navigation } from "react-native-navigation"
import Text from "components/Text"
import { PropTypes } from "prop-types"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import styles from "./styles"

@observer
class NewsBlock extends React.Component {
  handlePress = ({ id, type, props }) => {
    Navigation.push("HomeScreen", {
      component: {
        name: `Post.${type}`,
        id: `${type}View${id}`,
        passProps: props,
      },
    })
  }

  _renderAuthor = author => (
    <View style={styles.author_container}>
      <Avatar
        medium
        rounded
        source={{ uri: author.profileImage.url }}
        overlayContainerStyle={styles.author_img}
        containerStyle={styles.author_img_contianer}
      />
    </View>
  )

  _getTileProps = (isFull) => {
    const tileProps = {
      style: styles.tile,
      containerStyle: styles.container,
      contentContainerStyle: styles.content_container,
      imageContainerStyle: styles.image_container,
      titleStyle: styles.caption,
    }
    if (isFull) {
      tileProps.contentContainerStyle = {
        ...styles.content_container,
        ...styles.full_content_container,
      }
      tileProps.containerStyle = {
        ...styles.container,
        ...styles.full_container,
      }
    }
    return tileProps
  }

  _renderDateStamp = date => (
    <View>
      <Text>{date.toDateString()}</Text>
    </View>
  )

  render() {
    const {
      title, viewComponent, imageSrc, author, date,
    } = this.props
    const isFull = !imageSrc
    const tileProps = this._getTileProps(isFull)
    const fontWeight = isFull ? "semibold" : "regular"
    return (
      <View style={styles.block}>
        {author ? this._renderAuthor(author) : null}
        <Tile {...tileProps} imageSrc={imageSrc} onPress={() => this.handlePress(viewComponent)}>
          <Text style={styles.title} Type="title" Color="black" Weight={fontWeight}>
            {title}
          </Text>
          {date ? this._renderDateStamp(date) : null}
        </Tile>
      </View>
    )
  }
}

NewsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  viewComponent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    props: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  imageSrc: PropTypes.objectOf(PropTypes.string),
  author: MobxTypes.observableObject,
  date: PropTypes.instanceOf(Date),
}

NewsBlock.defaultProps = {
  imageSrc: null,
  author: null,
  date: null,
}

export default NewsBlock
