import { z } from 'zod'
import { CreateProfileDto } from './user.dto.js'

export const SignupDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).max(100),
})

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const CompleteProfileDto = CreateProfileDto.omit({ name: true }).partial().extend({
  name: z.string().min(2).optional(),
})

export type SignupInput = z.infer<typeof SignupDto>
export type LoginInput = z.infer<typeof LoginDto>
