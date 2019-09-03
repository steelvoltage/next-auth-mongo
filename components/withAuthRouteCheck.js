import React, { Component } from 'react'
import Layout from './layout/Layout'
import { authRouteCheck } from '../lib/authHelpers'

function withAuthRouteCheck(C) {
  return class extends Component {
    constructor(props) {
      super(props)
    }
    static async getInitialProps(ctx) {
      const userId = await authRouteCheck(ctx)
      const cProps = C.getInitialProps && (await C.getInitialProps(ctx, userId))
      return { ...cProps, userId }
    }

    componentDidMount() {
      window.addEventListener('storage', e => authLogoutSync(e))
    }

    render() {
      const { userId } = this.props
      return (
        <Layout userId={userId}>
          <C {...this.props} />
        </Layout>
      )
    }
  }
}

export default withAuthRouteCheck
