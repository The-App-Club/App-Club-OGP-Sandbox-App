import { readFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'

import { lazy, Suspense } from 'react'

import { Box } from '@mui/joy'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import ErrorBoundary from '@/components/fallback/ErrorBoundary'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import { env } from '@/config/env'
import { UserData, UsersData } from '@/features/user/types'
import { createOGP } from '@/libs/createOGP'

const User = lazy(() => import('@/features/user/components/User'))

// https://stackoverflow.com/a/71013990/15972569
const UserPage: NextPage<{ user: UserData }> = ({ user }) => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Box
            className={
              'mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center justify-center'
            }
          >
            <FallbackLoading />
          </Box>
        }
      >
        <User user={user} />
      </Suspense>
    </ErrorBoundary>
  )
}

const fetcher = (): Promise<UsersData> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (env.NODE_ENV === 'production') {
        const localFilePath = join(cwd(), 'src', 'data', 'users.json')
        const rawData = readFileSync(localFilePath).toString('utf-8')
        const data: UsersData = JSON.parse(rawData)
        resolve(data)
      } else {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL}/data/users.json`
        )
        const data: UsersData = await response.json()
        resolve(data)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher()
  if (!data) {
    return {
      paths: [],
      fallback: false,
    }
  }
  const paths = data.map((item: UserData, index: number) => ({
    params: {
      userId: `${item?.id}`,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const data = await fetcher()
  if (!data) {
    return {
      props: {
        user: null,
      },
      revalidate: 10,
    }
  }
  const matchedData = data.find((item: UserData) => {
    return item?.id === params?.userId
  })

  data.forEach((item: UserData, index: number) => {
    void createOGP(item?.id)
  })

  return {
    props: {
      user: matchedData,
    },
    revalidate: 10,
  }
}

export default UserPage
