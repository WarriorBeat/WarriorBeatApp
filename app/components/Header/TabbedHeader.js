/**
 * TabbedHeader.js
 * Header Component
 * components
 */

import React from "react"
import { View, ViewPropTypes } from "react-native"
import { Header, Button } from "react-native-elements"
import Text from "components/Text"
import { PropTypes } from "prop-types"
import { observer } from "mobx-react/native"
import { observable } from "mobx"
import Image from "react-native-fast-image"
import { colors } from "config/styles"
import brandMedia from "config/assets"
import styles from "./styles"

const TabButton = ({
  title, active, onPress, pos,
}) => (
  <Button
    onPress={() => onPress(pos)}
    disabled={active === pos}
    type="clear"
    buttonStyle={styles.tab_button}
    disabledStyle={styles.tab_button_selected}
    title={(
      <Text Color="white" Weight="bold">
        {title}
      </Text>
    )}
  />
)

const Tabs = (props) => {
  const {
    leftButton, rightButton, active, onPress,
  } = props
  return (
    <View style={styles.tab_container}>
      <TabButton onPress={onPress} title={leftButton} active={active} pos="left" />
      <TabButton onPress={onPress} title={rightButton} active={active} pos="right" />
    </View>
  )
}

class TabbedHeader extends React.Component {
  @observable
  activeTab = "left"

  _renderCenterComponent = () => {
    const { centerImage } = this.props
    return (
      <View>
        <Image
          style={styles.header_image}
          source={centerImage}
          resizeMode={Image.resizeMode.contain}
        />
      </View>
    )
  }

  render() {
    const { backgroundColor, leftButton, rightButton } = this.props
    return (
      <View>
        <Header
          barStyle="light-content"
          centerContainerStyle={styles.center_container}
          containerStyle={styles.header_container}
          backgroundColor={backgroundColor}
          centerComponent={this._renderCenterComponent()}
        />
        <Tabs
          leftButton={leftButton}
          rightButton={rightButton}
          active={this.activeTab}
          onPress={pos => (this.activeTab = pos)}
        />
      </View>
    )
  }
}

TabbedHeader.propTypes = {
  backgroundColor: ViewPropTypes.style,
  centerImage: PropTypes.number,
  leftButton: PropTypes.string.isRequired,
  rightButton: PropTypes.string.isRequired,
}

TabbedHeader.defaultProps = {
  backgroundColor: colors.primary,
  centerImage: brandMedia.warrior_head,
}

Tabs.propTypes = {
  leftButton: PropTypes.string.isRequired,
  rightButton: PropTypes.string.isRequired,
  active: PropTypes.oneOf(["left", "right"]).isRequired,
  onPress: PropTypes.func.isRequired,
}

TabButton.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.oneOf(["left", "right"]).isRequired,
  onPress: PropTypes.func.isRequired,
  pos: PropTypes.oneOf(["left", "right"]).isRequired,
}

export default observer(TabbedHeader)
