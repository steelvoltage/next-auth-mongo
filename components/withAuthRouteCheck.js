import React, { Component } from 'react'
import Layout from './layout/Layout'
import { authRouteCheck } from '../lib/authHelpers'

function withAuthRouteCheck(C) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    static async getInitialProps(ctx) {
      const user = authRouteCheck(ctx)
      const cProps = C.getInitialProps && (await C.getInitialProps(ctx))
      return { ...cProps, user }
    }
    render() {
      const { user } = this.props
      return (
        <Layout user={user}>
          <C {...this.props} />
        </Layout>
      )
    }
  }
}

export default withAuthRouteCheck
