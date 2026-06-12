import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { prisma } from '../lib/prisma.js'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  void _next
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation failed', details: err.flatten() })
    return
  }

  const message = err instanceof Error ? err.message : 'Internal server error'
  prisma.systemLog
    .create({
      data: { type: 'ERROR', message, metadata: { stack: err instanceof Error ? err.stack : null } },
    })
    .catch(() => {})

  res.status(500).json({ error: message })
}
