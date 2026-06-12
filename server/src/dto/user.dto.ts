import { z } from 'zod'
import { MALAYSIA_UNIVERSITIES } from '../data/malaysiaUniversities.js'

export const GenderEnum = z.enum(['MALE', 'FEMALE', 'NON_BINARY', 'OTHER'])

export const UniversityEnum = z.enum(MALAYSIA_UNIVERSITIES)

export const CreateProfileDto = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(18).max(99),
  gender: GenderEnum,
  interestedGender: z.array(GenderEnum).min(1),
  university: UniversityEnum,
  faculty: z.string().min(2),
  course: z.string().min(2),
  year: z.string().min(1),
  personalityType: z.string().min(2),
  datingGoal: z.string().min(2),
  comfortLevel: z.string().min(2),
  relationshipPace: z.string().min(2),
  loveLanguage: z.string().min(2),
  hobbies: z.array(z.string()).min(1),
  musicTaste: z.array(z.string()).default([]),
  foodPreference: z.string().min(2),
  budgetPreference: z.string().min(2),
  cgpa: z.string().min(2),
  languages: z.array(z.string()).min(1),
  outdoorPerson: z.string().min(2),
  allergies: z.string().min(1),
  socialBattery: z.string().min(2),
  preferredMeetingStyle: z.string().min(2),
  availability: z.array(z.object({ day: z.string(), timeSlot: z.string() })).min(1),
  dealBreakers: z.array(z.string()).default([]),
  redFlags: z.array(z.string()).default([]),
  greenFlags: z.array(z.string()).default([]),
  location: z.string().min(2),
  profilePicture: z.string().url().optional(),
})

export type CreateProfileInput = z.infer<typeof CreateProfileDto>

export const UpdateProfileDto = CreateProfileDto.partial()

export type UpdateProfileInput = z.infer<typeof UpdateProfileDto>
