import React, { ReactNode } from 'react'

import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Seperator from './Seperator'

type Props = {
  children: ReactNode
  title: string
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container md:mx-auto">
        <Header />
        <Seperator />
        <div className="px-6 py-8">{children}</div>
        <Seperator />
        <Footer />
      </div>
    </>
  )
}

export default Layout
