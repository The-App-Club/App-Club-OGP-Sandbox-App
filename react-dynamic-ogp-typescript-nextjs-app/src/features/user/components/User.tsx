/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Avatar, Box, Divider, Typography } from '@mui/joy'
import { ArrowLeft } from 'phosphor-react'

import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import { UserData } from '@/features/user/types'

const UserPage = ({ user }: { user: UserData }) => {
  const renderContent = ({ user }: { user: UserData }) => {
    if (!user) {
      return <FallbackLoading />
    }

    return (
      <Box
        css={css`
          min-height: 6rem;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
        `}
      >
        <Avatar alt={`${user.name}`} src={`${user.avator}`} size={`lg`} />
        <Box>
          <Typography
            component={'b'}
            css={css`
              font-size: 1.125rem; /* 18px */
              line-height: 1.75rem; /* 28px */
            `}
          >
            {user.name}
          </Typography>
          <Spacer />
          <Typography color='neutral'>{user.email}</Typography>
        </Box>
      </Box>
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
        <NextLink href={`/users`} passHref>
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
          Focused User
        </Typography>
      </Box>

      <Spacer />
      <Divider />
      <Spacer />
      {renderContent({ user })}
    </Box>
  )
}

export default UserPage
