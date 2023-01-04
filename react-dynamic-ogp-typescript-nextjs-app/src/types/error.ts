import { RequestResult } from 'faunadb'
import { z } from 'zod'

const ErrorSchema = z.object({
  description: z.string(),
  message: z.string(),
  name: z.string(),
  requestResult: z.custom<RequestResult>(),
})

const ErrorDataSchema = ErrorSchema.nullish()

export type ErrorData = z.infer<typeof ErrorDataSchema>
