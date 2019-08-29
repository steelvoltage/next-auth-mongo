import React from 'react'
import Head from 'next/head'
import withAuth from '../components/withAuth'

function Home({ user }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="title">Home</h1>
      <p>{user ? `Welcome ${user.displayName}!` : 'Welcome!'}</p>
    </>
  )
}

export default withAuth(Home)
