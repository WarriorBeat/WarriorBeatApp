/**
 * PageWithHeader.js
 * PageWIthHeader Layout
 * components/Layout
 */

import React from "react"
import { PropTypes } from "prop-types"
import {
  Header, Content, Container, Left, Body, Title,
} from "native-base"
import { Icon } from "react-native-elements"
import { icons } from "config/styles"
import { Typo } from "components/Text"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { Colors } from "components/styles"
import { StyleSheet, ViewPropTypes } from "react-native"

const styles = ({ backgroundColor }) => StyleSheet.create({
  default: {
    ...Colors.bgColor(backgroundColor),
  },
})

@inject("uiStore")
@observer
class PageWithHeader extends React.Component {
  render() {
    const {
      uiStore, children, title, containerStyle,
    } = this.props
    return (
      <Container style={[styles(this.props).default, containerStyle]}>
        <Header transparent>
          <Left>
            <Icon
              {...icons.arrow_back}
              color={Colors.type.black}
              onPress={() => uiStore.goBack()}
            />
          </Left>
          <Body>
            <Title>
              <Typo.Header>{title}</Typo.Header>
            </Title>
          </Body>
        </Header>
        <Content>{children}</Content>
      </Container>
    )
  }
}

PageWithHeader.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

PageWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
}

PageWithHeader.defaultProps = {
  title: "Header",
  backgroundColor: Colors.type.soft.white,
  containerStyle: {},
}

export default PageWithHeader
