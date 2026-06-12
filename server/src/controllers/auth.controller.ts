import type { Response, NextFunction } from 'express'
import { SignupDto, LoginDto } from '../dto/auth.dto.js'
import { CreateProfileDto } from '../dto/user.dto.js'
import { authService } from '../services/AuthService.js'
import { matchRepository } from '../repositories/match.repository.js'
import type { AuthRequest } from '../middleware/userAuth.js'
import { DATE_PLAN_TEMPLATES } from '../data/datePlanTemplates.js'

export async function signup(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = SignupDto.parse(req.body)
    const result = await authService.signup(data)
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
}

export async function login(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = LoginDto.parse(req.body)
    const result = await authService.login(data)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.userId!)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const match = await matchRepository.findByUserId(user.id)
    const safeMatch = match
      ? {
          id: match.id,
          status: match.status,
          ...(match.status === 'REVEALED'
            ? {
                compatibilityScore: match.compatibilityScore,
                aiReason: match.aiReason,
              }
            : {}),
        }
      : null
    res.json({ user, match: safeMatch })
  } catch (e) {
    next(e)
  }
}

export async function saveProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = CreateProfileDto.parse(req.body)
    const existing = await authService.getMe(req.userId!)
    const user =
      existing?.profileComplete && existing.status !== 'INCOMPLETE_PROFILE'
        ? await authService.updateProfile(req.userId!, data)
        : await authService.completeProfile(req.userId!, data)
    res.json({ user })
  } catch (e) {
    next(e)
  }
}

export async function completeProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = CreateProfileDto.parse(req.body)
    const result = await authService.completeProfile(req.userId!, data)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export function listDatePlanTemplates(_req: AuthRequest, res: Response) {
  res.json({
    count: DATE_PLAN_TEMPLATES.length,
    templates: DATE_PLAN_TEMPLATES.map((t) => ({
      id: t.id,
      title: t.title,
      budget: t.budget,
      vibe: t.vibe,
      foodTags: t.foodTags,
      interestTags: t.interestTags,
    })),
  })
}
