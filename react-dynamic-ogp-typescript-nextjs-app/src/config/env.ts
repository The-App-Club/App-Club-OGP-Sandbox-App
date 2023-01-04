import { envsafe, num, str } from 'envsafe'

const env = envsafe({
  NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL: str({
    default: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL,
  }),
  NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT: num({
    default: 3000,
  }),
  NEXT_PUBLIC_DEBUG_FLG: num({
    default: 0,
  }),
  NEXT_PUBLIC_ERROR_RETRY_COUNT: num({
    default: 0,
  }),
  NEXT_PUBLIC_ERROR_RETRY_INTERVAL: num({
    default: 300,
  }),
})

export { env }
