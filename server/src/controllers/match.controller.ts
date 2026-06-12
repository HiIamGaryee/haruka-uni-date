import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../middleware/userAuth.js'
import { matchEngineService } from '../services/MatchEngineService.js'
import { matchResultService } from '../services/MatchResultService.js'
import { matchScheduleService } from '../services/MatchScheduleService.js'
import { z } from 'zod'

const ScheduleDto = z.object({
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeStart: z.string().regex(/^\d{2}:\d{2}$/),
  timeEnd: z.string().regex(/^\d{2}:\d{2}$/),
})

export async function runMatch(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await matchEngineService.runForUser(req.userId!)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export async function getMatchResult(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const matchId = Array.isArray(req.params.matchId) ? req.params.matchId[0] : req.params.matchId
    const result = await matchResultService.getResultForUser(req.userId!, matchId)
    res.json(result)
  } catch (e) {
    const err = e as Error & { statusCode?: number }
    if (err.statusCode === 403) {
      res.status(403).json({ error: err.message })
      return
    }
    if (err.statusCode === 404) {
      res.status(404).json({ error: err.message })
      return
    }
    next(e)
  }
}

export async function scheduleMatch(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const matchId = Array.isArray(req.params.matchId) ? req.params.matchId[0] : req.params.matchId
    const data = ScheduleDto.parse(req.body)
    const datePlan = await matchScheduleService.schedule(req.userId!, matchId, data)
    res.json({ datePlan })
  } catch (e) {
    const err = e as Error & { statusCode?: number }
    if (err.statusCode === 400 || err.statusCode === 403 || err.statusCode === 404) {
      res.status(err.statusCode).json({ error: err.message })
      return
    }
    next(e)
  }
}
