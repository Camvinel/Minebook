import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Authentification from '../components/authentification'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MINEBOOK</title>
        <meta name="description" content="Championnat de beauté" />
      </Head>

      <div className="container">
        <Authentification />
      </div>
    </div>
  )
}

export default Home