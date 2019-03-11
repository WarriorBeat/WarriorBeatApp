/**
 * GenericFeed.js
 * Component to host a generic feed of posts
 * Main File
 */

import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import { observer, inject, PropTypes as MobxTypes } from "mobx-react/native"
import { ArticleBlock, PollBlock } from "components/NewsBlock"
import { compose } from "react-apollo"
import queries from "graphql/queries"
import styles from "./styles"
import * as GraphQL from "/api/graphql"

@inject("postStore")
@observer
class GenericFeed extends React.Component {
  render() {
    const {
      categoryId, postStore, polls, withPolls,
    } = this.props
    const { posts } = postStore
    return (
      <View style={styles.list_container}>
        {withPolls ? polls.map(p => <PollBlock key={`poll${p.id}`} poll={p} />) : null}
        {posts.map((p) => {
          if (categoryId) {
            return p.categories.find(cat => cat.id === categoryId) ? (
              <ArticleBlock key={p.id} postId={p.id} />
            ) : null
          }
          return <ArticleBlock key={p.id} postId={p.id} />
        })}
      </View>
    )
  }
}

GenericFeed.wrappedComponent.propTypes = {
  postStore: MobxTypes.observableObject.isRequired,
  // pollStore: MobxTypes.observableObject.isRequired,
}

GenericFeed.propTypes = {
  categoryId: PropTypes.string,
  withPolls: PropTypes.bool,
}

GenericFeed.defaultProps = {
  categoryId: false,
  withPolls: false,
}

export default compose(queries.fetchPolls)(GenericFeed)
