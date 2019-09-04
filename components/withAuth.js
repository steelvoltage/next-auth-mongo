import React, { Component } from 'react'
import Layout from './layout/Layout'
import { authCheck, authLogoutSync } from '../lib/authHelpers'

function withAuth(C, misdirect) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    static async getInitialProps(ctx) {
      const user = await authCheck(ctx, misdirect)
      const cProps = C.getInitialProps && (await C.getInitialProps(ctx, user))
      return { ...cProps, user }
    }

    componentDidMount() {
      window.addEventListener('storage', e => authLogoutSync(e))
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

export default withAuth
