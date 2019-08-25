import React, { Component } from 'react'
import Layout from './layout/Layout'
import { authCheck, authLogoutSync } from '../lib/utils/authHelpers'

const withAuth = C => {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      window.addEventListener('storage', e => authLogoutSync(e))
    }

    static async getInitialProps(ctx) {
      const user = authCheck(ctx)
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

export default withAuth
