import { z } from 'zod'

import { UserSchema } from '@/features/user/domains/user'

const UserDataSchema = UserSchema.nullish()
const UsersDataSchema = UserDataSchema.array().nullish()

export type UserData = z.infer<typeof UserDataSchema>
export type UsersData = z.infer<typeof UsersDataSchema>
export const USER_KEY = 'user'
