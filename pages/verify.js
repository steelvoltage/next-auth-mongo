import React from 'react'
import Head from 'next/head'
import withAuthUnverified from '../components/withAuthUnverified'

function Verify() {
  return (
    <div>
      <Head>
        <title>Verify Email</title>
      </Head>
      <h1 className="title">Verify Email</h1>
      <p>
        A message was sent to your provided email address. Please check it and
        click the link for verification.
      </p>
      <button className="button">Resend Verification</button>
      <style jsx>{`
        .button {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}

export default withAuthUnverified(Verify)
