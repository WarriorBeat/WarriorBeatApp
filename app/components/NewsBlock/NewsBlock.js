/**
 * NewsBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { View } from "react-native"
import { Tile, Avatar, Badge } from "react-native-elements"
import { Navigation } from "react-native-navigation"
import Text from "components/Text"
import { PropTypes } from "prop-types"
import { observer, PropTypes as MobxTypes } from "mobx-react/native"
import styles from "./styles"

@observer
class NewsBlock extends React.Component {
  handlePress = ({
    id, type, props, modal,
  }) => {
    const screen = {
      component: {
        name: `Post.${type}`,
        id: `${type}View${id}`,
        passProps: props,
      },
    }
    if (modal) {
      Navigation.showModal({
        stack: {
          children: [screen],
        },
      })
    } else {
      Navigation.push("HomeScreen", screen)
    }
  }

  _renderAuthor = author => (
    <View style={styles.author_container}>
      <View style={styles.author_img_shadow}>
        <Avatar rounded size="medium" source={{ uri: author.profileImage.url }} />
      </View>
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
    <View style={styles.dateStamp}>
      <Text style={styles.date} Type="subhead" Color="black_light" Weight="bold">
        {date.toDateString()}
      </Text>
    </View>
  )

  _renderBadge = content => (
    <View style={styles.badge_container}>
      <Badge containerStyle={styles.badge}>
        <Text Weight="bold" Color="#5D6160" style={styles.badge_text}>
          {content}
        </Text>
      </Badge>
    </View>
  )

  render() {
    const {
      title, viewComponent, imageSrc, author, date, badge,
    } = this.props
    const isFull = !imageSrc
    const tileProps = this._getTileProps(isFull)
    const fontWeight = isFull ? "semibold" : "regular"
    const contentStyle = isFull ? { ...styles.content, ...styles.content_full } : styles.content
    return (
      <View style={styles.block}>
        {badge ? this._renderBadge(badge) : null}
        {author ? this._renderAuthor(author) : null}
        <Tile {...tileProps} imageSrc={imageSrc} onPress={() => this.handlePress(viewComponent)}>
          <View style={contentStyle}>
            <Text style={styles.title} Type="title" Color="black" Weight={fontWeight}>
              {title}
            </Text>
          </View>
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
