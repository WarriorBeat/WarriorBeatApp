/**
 * initializing.js
 * Initializing Screen (Splash)
 * screens
 */

import React from "react"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { when } from "mobx"
import { Container } from "native-base"
import { Row, Grid } from "react-native-easy-grid"
import Image from "react-native-fast-image"
import brandMedia from "config/assets"
import * as Progress from "react-native-progress"
import { colors } from "config/styles"
import styles from "./styles"

@inject("uiStore", "userStore")
@observer
class Initializing extends React.Component {
  async componentDidMount() {
    const { uiStore, userStore } = this.props
    await when(() => userStore.ready)
    uiStore.preload()
    uiStore.state = "ready"
    const homeProps = {
      categorySortOrder: {
        key: "name",
        values: ["News", "Sports"],
      },
    }
    const animation = {
      animations: {
        push: {
          waitForRender: true,
          content: {
            alpha: {
              from: 0.1,
              to: 1,
              duration: 600,
              startDelay: 0,
              interpolation: "accelerate",
            },
            y: {
              from: 600,
              to: 0,
              duration: 500,
              startDelay: 0,
              interpolation: "accelerate",
            },
          },
        },
      },
    }
    uiStore.push("Home", null, homeProps, "Initializing", animation)
  }

  render() {
    return (
      <Container style={styles.root}>
        <Grid>
          <Row style={styles.iconCol}>
            <Image
              source={brandMedia.warrior_head}
              style={styles.image}
              resizeMode={Image.resizeMode.contain}
            />
          </Row>
          <Row style={styles.loaderCol}>
            <Progress.CircleSnail size={30} indeterminate color={colors.ios.white} thickness={1} />
          </Row>
        </Grid>
      </Container>
    )
  }
}

Initializing.wrappedComponent.propTypes = {
  uiStore: MobxTypes.observableObject.isRequired,
  userStore: MobxTypes.observableObject.isRequired,
}

export default Initializing
