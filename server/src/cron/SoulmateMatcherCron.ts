import cron from 'node-cron'
import { prisma } from '../lib/prisma.js'
import { matchEngineService } from '../services/MatchEngineService.js'
import { env } from '../config/env.js'

export function startSoulmateMatcherCron() {
  if (!env.CRON_ENABLED) {
    console.log('[cron] SoulmateMatcherCron disabled')
    return
  }

  cron.schedule('*/30 * * * *', async () => {
    console.log('[cron] SoulmateMatcherCron running...')
    try {
      const results = await matchEngineService.runForAllWaiting()
      await prisma.systemLog.create({
        data: {
          type: 'CRON',
          message: `SoulmateMatcherCron completed. ${results.length} new matches.`,
          metadata: { matchCount: results.length },
        },
      })
      console.log(`[cron] Done. ${results.length} matches created.`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Cron failed'
      await prisma.systemLog.create({
        data: { type: 'ERROR', message: `[cron] ${message}` },
      })
      console.error('[cron] Error:', message)
    }
  })

  console.log('[cron] SoulmateMatcherCron scheduled every 30 minutes')
}
