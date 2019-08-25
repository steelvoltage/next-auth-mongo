import React from 'react'
import Head from 'next/head'
import withAuth from '../components/withAuth'

const Register = () => (
  <>
    <Head>
      <title>Register</title>
    </Head>
    <h1 className="title">Register</h1>
  </>
)

export default withAuth(Register, true)
