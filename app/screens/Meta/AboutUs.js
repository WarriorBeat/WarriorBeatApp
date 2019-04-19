/**
 * AboutUs.js
 * About Us Meta Page
 * screens/Meta
 */

import React from "react"
import { PageWithHeader, Row } from "components/Layout"
import { Typo } from "components/Text"
import { Logo, Social } from "components/Generic"
import { Divider } from "react-native-elements"
import { Position } from "components/styles"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"

@inject("uiStore")
@observer
class AboutUs extends React.Component {
  render() {
    const { uiStore } = this.props
    const meta = uiStore.metaData.about
    return (
      <PageWithHeader title="About Us">
        <Row center="center" vPad="3%">
          <Logo />
        </Row>
        <Row hPad="2%" center="center">
          <Typo.HTMLBody content={meta.content} />
        </Row>
        <Row hPad="20%" vPad="1%">
          <Divider style={Position.flex} />
        </Row>
        <Row center="center" justify="space-around" vPad="2%">
          <Social />
        </Row>
      </PageWithHeader>
    )
  }
}

AboutUs.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
}

export default AboutUs