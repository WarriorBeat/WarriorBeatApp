/**
 * SideMenu.js
 * SideMenu Component
 * components/Menu
 */

import React from "react"
import { StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { PropTypes } from "prop-types"
import { Grid, Row, Col } from "components/Layout"
import { Logo } from "components/Generic"
import { observer } from "mobx-react/native"
import { Colors } from "components/styles"

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    ...Colors.color("transparent"),
  },
})

const SideMenu = (props) => {
  const { logo, footer, children } = props
  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#2d2d2d", "#393939"]}
      locations={[0.2, 0.3]}
      start={{ x: 0.5, y: 1.0 }}
      end={{ x: 1, y: 0.25 }}
    >
      <Grid>
        <Col height="100%">
          <Row width="100%" justify="flex-start" hPad="2.5%" vPad="5.5%">
            {logo ? <Logo size="40%" /> : null}
          </Row>
          <Row width="100%" hPad="3%">
            <Col>{children}</Col>
          </Row>
          <Row width="100%" center="end">
            <Col>{footer}</Col>
          </Row>
        </Col>
      </Grid>
    </LinearGradient>
  )
}

SideMenu.propTypes = {
  logo: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}

SideMenu.defaultProps = {
  logo: false,
  header: null,
  footer: null,
}

export default observer(SideMenu)
