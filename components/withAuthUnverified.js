import React, { Component } from 'react'
import Layout from './layout/Layout'
import { authRouteCheck, getUser } from '../lib/authHelpers'
import Router from 'next/router'

function withAuthUnverified(C) {
  return class extends Component {
    constructor(props) {
      super(props)
    }
    static async getInitialProps(ctx) {
      const token = authRouteCheck(ctx)
      const user = await getUser(token)
      console.log(user)
      if (user.isVerified && ctx.req) {
        ctx.res.writeHead(302, { Location: '/account' })
        ctx.res.end()
      } else if (user.isVerified) {
        Router.push('/account')
      } else {
        const cProps = C.getInitialProps && (await C.getInitialProps(ctx, user))
        return { ...cProps, user }
      }
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

export default withAuthUnverified
