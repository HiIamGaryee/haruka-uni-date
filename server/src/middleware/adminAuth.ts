import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { prisma } from '../lib/prisma.js'

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers['x-admin-key']
  if (adminKey === env.ADMIN_API_KEY) {
    next()
    return
  }

  const bearer = req.headers.authorization?.replace('Bearer ', '')
  if (bearer) {
    try {
      const payload = jwt.verify(bearer, env.JWT_SECRET) as { sub: string; role?: string }
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { role: true, status: true },
      })
      if (user?.role === 'ADMIN' && user.status !== 'BANNED') {
        next()
        return
      }
    } catch {
      // fall through
    }
  }

  res.status(401).json({ error: 'Unauthorized admin access' })
}
