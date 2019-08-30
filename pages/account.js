import React from 'react'
import Head from 'next/head'
import withAuthRouteCheck from '../components/withAuthRouteCheck'

function Account({ user }) {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <h1 className="title">Account</h1>
      <p>{user.id}</p>
    </>
  )
}

export default withAuthRouteCheck(Account)
