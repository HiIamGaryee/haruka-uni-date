import type { Request, Response, NextFunction } from 'express'

function paramId(req: Request): string {
  const id = req.params.id
  return Array.isArray(id) ? id[0] : id
}
import { adminService } from '../services/AdminService.js'
import { userRepository } from '../repositories/user.repository.js'
import { prisma } from '../lib/prisma.js'

export async function getOverview(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getOverview())
  } catch (e) {
    next(e)
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await adminService.getUsers({
      status: req.query.status as string | undefined,
      search: req.query.search as string | undefined,
    })
    res.json(users)
  } catch (e) {
    next(e)
  }
}

export async function getWaitingPool(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getWaitingPool())
  } catch (e) {
    next(e)
  }
}

export async function getMatches(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getMatchHistory())
  } catch (e) {
    next(e)
  }
}

export async function getReports(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getReports())
  } catch (e) {
    next(e)
  }
}

export async function resolveReport(req: Request, res: Response, next: NextFunction) {
  try {
    const action = req.body.action as 'WARN' | 'SUSPEND' | 'BAN' | 'DISMISS'
    res.json(await adminService.resolveReport(paramId(req), action))
  } catch (e) {
    next(e)
  }
}

export async function getAnalytics(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getAnalytics())
  } catch (e) {
    next(e)
  }
}

export async function getLogs(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getLogs())
  } catch (e) {
    next(e)
  }
}

export async function banUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.ban(paramId(req), req.body.reason ?? 'Admin ban')
    await prisma.systemLog.create({
      data: { type: 'BAN', message: `User banned: ${user.name}`, userId: user.id },
    })
    res.json(user)
  } catch (e) {
    next(e)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = paramId(req)
    const user = await userRepository.findById(id)
    await userRepository.delete(id)
    await prisma.systemLog.create({
      data: { type: 'DELETE', message: `User deleted: ${user?.name ?? id}` },
    })
    res.json({ success: true })
  } catch (e) {
    next(e)
  }
}

export async function forceMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const { userAId, userBId } = req.body
    res.json(await adminService.forceMatch(userAId, userBId))
  } catch (e) {
    next(e)
  }
}

export async function getCandidates(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.previewCandidates(paramId(req)))
  } catch (e) {
    next(e)
  }
}

export async function verifyAdmin(req: Request, res: Response) {
  res.json({ ok: true })
}
