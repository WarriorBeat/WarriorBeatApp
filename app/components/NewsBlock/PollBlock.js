/**
 * PollBlock.js
 * News Block Component
 * Main File
 */

import React from "react"
import { PropTypes } from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import NewsBlock from "./NewsBlock"

@inject("pollStore")
@observer
class PollBlock extends React.Component {
  render() {
    const { pollStore, pollId } = this.props
    const poll = pollStore.resolvePoll(pollId)
    const pollView = {
      id: poll.id,
      type: "Poll",
      props: { pollId: poll.id },
    }
    return <NewsBlock title={poll.question} date={poll.date} viewComponent={pollView} />
  }
}

PollBlock.wrappedComponent.propTypes = {
  pollStore: MobxTypes.observableObject.isRequired,
}

PollBlock.propTypes = {
  pollId: PropTypes.string.isRequired,
}

export default PollBlock
