import React from 'react'
import Head from 'next/head'

import Nav from './Nav'

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="../../static/style.css" />
      </Head>
      <Nav user={user} />
      <main className="buffer">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">{children}</div>
          </div>
        </div>
      </main>
      <style jsx>{`
        .buffer {
          margin-top: 1rem;
        }
      `}</style>
    </>
  )
}

export default Layout
