/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Box, Divider, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'

import Spacer from '@/components/ui/Spacer'
import { ErrorData } from '@/types/error'

const SATORI_OGP_KEY = 'satori'

const SatoriOGP = () => {
  const { data, error, refetch } = useQuery<any, ErrorData>({
    queryKey: [SATORI_OGP_KEY],
    queryFn: async () => {
      const response = await fetch('/api/hello')
      const json = await response.json()
      return json
    },
  })

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
        Satori OGP
      </Typography>
      <Spacer />
      <Divider />
      <Spacer />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <hr />
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <style jsx>{`
        @font-face {
          font-family: 'Radio Canada';
          src: url('/fonts/radio-canada-vietnamese-700-normal.woff2');
        }
        p {
          font-family: 'Radio Canada';
        }
      `}</style>
    </Box>
  )
}

export default SatoriOGP
