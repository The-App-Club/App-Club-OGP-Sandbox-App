/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Divider, Typography } from '@mui/joy'
import { Link } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'phosphor-react'

import { FallbackDataEmpty } from '@/components/fallback/FallbackDataEmpty'
import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import { env } from '@/config/env'
import { USER_KEY, UsersData } from '@/features/user/types'
import { queryClient } from '@/libs/queryClient'
import { ErrorData } from '@/types/error'

const UsersPage = () => {
  const { data, error, refetch } = useQuery<UsersData, ErrorData>({
    queryKey: [USER_KEY],
    queryFn: async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL}/data/users.json`
      )
      const json = await response.json()
      return json
    },
  })

  const renderContent = ({
    data,
    error,
    refetch,
  }: {
    data: UsersData
    error: ErrorData
    refetch: any
  }) => {
    if (error) {
      return (
        <FallbackError
          message={error.message}
          refetch={() => {
            queryClient.removeQueries([USER_KEY])
            refetch()
          }}
        />
      )
    }

    if (!data) {
      return <FallbackLoading />
    }

    if (data.length === 0) {
      return <FallbackDataEmpty />
    }

    return (
      <ul>
        {data?.map((item, index) => {
          return (
            <li key={index}>
              <NextLink href={`/users/${item?.id}`} passHref>
                <Link>
                  <Typography>{item?.name}</Typography>
                </Link>
              </NextLink>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `}
      >
        <NextLink href={`/`} passHref>
          <ArrowLeft
            size={32}
            css={css`
              :hover {
                cursor: pointer;
              }
            `}
          />
        </NextLink>
        <Typography
          component={'h1'}
          level='h1'
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          Users
        </Typography>
      </Box>
      <Spacer />
      <Divider />
      <Spacer />
      {renderContent({ data, error, refetch })}
    </Box>
  )
}

export default UsersPage
