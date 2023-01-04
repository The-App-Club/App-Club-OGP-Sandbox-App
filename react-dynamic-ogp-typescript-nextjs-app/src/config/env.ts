import { envsafe, num, str } from 'envsafe'

const env = envsafe({
  NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL: str({
    default: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL,
  }),
  NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT: num({
    default: Number(process.env.NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT),
  }),
  NEXT_PUBLIC_DEBUG_FLG: num({
    default: Number(process.env.NEXT_PUBLIC_DEBUG_FLG),
  }),
  NEXT_PUBLIC_ERROR_RETRY_COUNT: num({
    default: Number(process.env.NEXT_PUBLIC_ERROR_RETRY_COUNT),
  }),
  NEXT_PUBLIC_ERROR_RETRY_INTERVAL: num({
    default: Number(process.env.NEXT_PUBLIC_ERROR_RETRY_INTERVAL),
  }),
  NODE_ENV: str({
    default: process.env.NODE_ENV,
    devDefault: process.env.NODE_ENV,
  }),
})

export { env }
