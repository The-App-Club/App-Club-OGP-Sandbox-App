import React from 'react'

import NextLink from 'next/link'

import { Link, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'

import { env } from '@/config/env'
import { ErrorData } from '@/types/error'

const USER_KEY = 'user'

export type User = {
  id: string
  name: string
  email: string
}

const SamplesPage: NextPage = () => {
  const { data, error, refetch } = useQuery<User[], ErrorData>({
    queryKey: [USER_KEY],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL}/data/users.json`
      )
      const json = await response.json()
      return json
    },
  })

  console.log(data)

  return (
    <div>
      <h1>Samples Page</h1>
      <ul>
        {data?.map((item, index) => {
          return (
            <li key={index}>
              <NextLink href={`/users/${item.id}`} passHref>
                <Link>
                  <Typography>{item.name}</Typography>
                </Link>
              </NextLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SamplesPage
