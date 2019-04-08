/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import { observer } from "mobx-react/native"
import { ArticleBlock, PollBlock } from "components/NewsBlock"
import { compose } from "react-apollo"
import { queries, PropTypes as gqlTypes } from "graphql"
import styles from "./styles"

@observer
class GenericFeed extends React.Component {
  render() {
    const {
      articles, loading, polls, withPolls,
    } = this.props
    return (
      <View style={styles.list_container}>
        {withPolls ? polls.map(p => <PollBlock key={`poll${p.id}`} poll={p} />) : null}
        {articles.map(p => (loading ? null : <ArticleBlock key={p.id} post={p} />))}
      </View>
    )
  }
}

GenericFeed.propTypes = {
  withPolls: PropTypes.bool,
  polls: PropTypes.arrayOf(gqlTypes.poll),
  articles: PropTypes.arrayOf(gqlTypes.article),
  loading: PropTypes.bool,
}

GenericFeed.defaultProps = {
  withPolls: false,
  polls: [],
  articles: [],
  loading: true,
}

export default compose(
  queries.poll.pollList,
  queries.article.articleGetByCategory,
)(GenericFeed)
