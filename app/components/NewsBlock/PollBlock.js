/**
 * PollBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes } from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import NewsBlock from "./NewsBlock"

@observer
class PollBlock extends React.Component {
  render() {
    const { poll } = this.props
    const pollView = {
      id: poll.id,
      type: "Poll",
      props: { poll },
      modal: true,
    }
    const badge = `${poll.totalVotes} Votes`
    return (
      <NewsBlock
        title={poll.question}
        date={poll.createdOn}
        viewComponent={pollView}
        badge={badge}
      />
    )
  }
}

// PollBlock.wrappedComponent.propTypes = {
//   // pollStore: MobxTypes.observableObject.isRequired,
// }

// PollBlock.propTypes = {
//   // pollId: PropTypes.string.isRequired,
// }

export default PollBlock
