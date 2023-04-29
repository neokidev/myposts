import { Header } from '@/components/Layout/components/Header'
import { ProtectedLayout } from '@/components/Layout/components/ProtectedLayout'
import clsx from 'clsx'
import Head from 'next/head'
import { useState, type FC, type ReactNode } from 'react'

type InnerMainLayoutProps = {
  children: ReactNode
  className?: string
}

type MainLayoutProps = {
  children: ReactNode
  className?: string
  isProtected?: boolean
}

const InnerMainLayout: FC<InnerMainLayoutProps> = ({ children, className }) => {
  return (
    <>
      <Head>
        <title>myposts</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-black space-y-6">
        <Header />
        <main className={clsx(className, 'container flex-1')}>{children}</main>
      </div>
    </>
  )
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  className,
  isProtected,
}) => {
  const [_isProtected] = useState(isProtected)

  return (
    <>
      {_isProtected ? (
        <ProtectedLayout>
          <InnerMainLayout className={className}>{children}</InnerMainLayout>
        </ProtectedLayout>
      ) : (
        <InnerMainLayout className={className}>{children}</InnerMainLayout>
      )}
    </>
  )
}
