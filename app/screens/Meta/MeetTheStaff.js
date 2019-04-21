/**
 * MeetTheStaff.js
 * Meet The Staff Component
 * components/Meta
 */

import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react/native"
import { PageWithHeader, Row, Col } from "components/Layout"
import { AuthorCard } from "components/Author"
import { compose } from "react-apollo"
import { queries, PropTypes as gqlTypes } from "graphql"

@observer
class MeetTheStaff extends React.Component {
  render() {
    const { loading, authors } = this.props
    return (
      <PageWithHeader title="Meet the Staff">
        <Col>
          <Row wrap>{loading ? null : authors.map(a => <AuthorCard author={a} />)}</Row>
        </Col>
      </PageWithHeader>
    )
  }
}

MeetTheStaff.propTypes = {
  loading: PropTypes.bool,
  authors: PropTypes.arrayOf(gqlTypes.author).isRequired,
}

MeetTheStaff.defaultProps = {
  loading: true,
}

export default compose(queries.author.authorList)(MeetTheStaff)
