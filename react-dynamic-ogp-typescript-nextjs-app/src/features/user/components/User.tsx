/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Divider, Typography } from '@mui/joy'
import { Link } from '@mui/joy'

import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import { UserData } from '@/features/user/types'

const UserPage = ({ user }: { user: UserData }) => {
  const renderContent = ({ user }: { user: UserData }) => {
    if (!user) {
      return <FallbackLoading />
    }

    return (
      <Box>
        <Typography>{user.id}</Typography>
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Spacer />
        <Divider />
        <NextLink href={`/users`} passHref>
          <Link underline='none'>users</Link>
        </NextLink>
      </Box>
    )
  }

  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
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
      <Spacer />
      <Divider />
      <Spacer />
      {renderContent({ user })}
    </Box>
  )
}

export default UserPage
