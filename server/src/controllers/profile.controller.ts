import type { Request, Response, NextFunction } from 'express'
import { CreateProfileDto } from '../dto/user.dto.js'
import { profileService } from '../services/ProfileService.js'
import { matchRepository } from '../repositories/match.repository.js'
import { userRepository } from '../repositories/user.repository.js'

export async function createProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const data = CreateProfileDto.parse(req.body)
    const result = await profileService.createProfile(data)
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
}

function paramId(req: Request): string {
  const id = req.params.id
  return Array.isArray(id) ? id[0] : id
}

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findById(paramId(req))
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch (e) {
    next(e)
  }
}

export async function getUserMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const match = await matchRepository.findByUserId(paramId(req))
    res.json(match)
  } catch (e) {
    next(e)
  }
}
