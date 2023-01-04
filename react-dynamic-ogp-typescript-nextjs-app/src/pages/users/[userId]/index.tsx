import React from 'react'

import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { env } from '@/config/env'
import { createOGP } from '@/libs/createOGP'

import { User } from '..'

// https://stackoverflow.com/a/71013990/15972569
const SamplePage: NextPage<{ user: User }> = ({ user }) => {
  console.log(`user`, user)
  const router = useRouter()
  return (
    <div>
      <h1>{router.query.dynamic}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL}/data/users.json`
  )
  const json: User[] = await response.json()

  const paths = json.map((item: User, index: number) => ({
    params: {
      userId: `${item.id}`,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context

  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL}/data/users.json`
  )
  const json: User[] = await response.json()
  const matchedData = json.find((item: User) => {
    return item.id === params?.userId
  })

  json.forEach((item: User, index: number) => {
    void createOGP(item.id)
  })

  return {
    props: {
      user: matchedData,
    },
    revalidate: 10,
  }
}

export default SamplePage
