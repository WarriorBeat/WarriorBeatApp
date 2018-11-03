/**
 * NewsBlock.js
 * News Block Components
 * Style
 */

import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.15)",
    borderWidth: 1.5,
    width: "100%",
    display: "flex",
    marginTop: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 5, height: 9 }
  },
  content_cont: {
    height: 70,
    backgroundColor: "rgb(241, 244, 246)",
    alignItems: "center"
  },
  caption: {
    fontWeight: "600"
  }
})
