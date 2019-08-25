import React from 'react'
import Head from 'next/head'
import withAuthRouteCheck from '../components/withAuthRouteCheck'

import Layout from '../components/layout/Layout'

const Account = ({ user }) => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <h1 className="title">Account</h1>
      <p>{user.email}</p>
    </>
  )
}

export default withAuthRouteCheck(Account)
