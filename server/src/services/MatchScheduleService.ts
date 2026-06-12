import { prisma } from '../lib/prisma.js'
import { matchRepository } from '../repositories/match.repository.js'
import {
  buildThreeHourTimeline,
  formatScheduledDateTime,
  validateScheduleInput,
} from '../lib/dateSchedule.js'

export class MatchScheduleService {
  async schedule(
    userId: string,
    matchId: string,
    input: { scheduledDate: string; timeStart: string; timeEnd: string },
  ) {
    const err = validateScheduleInput(input.scheduledDate, input.timeStart, input.timeEnd)
    if (err) throw Object.assign(new Error(err), { statusCode: 400 })

    const match = await matchRepository.findById(matchId)
    if (!match) throw Object.assign(new Error('Match not found'), { statusCode: 404 })

    const isParticipant = match.userAId === userId || match.userBId === userId
    if (!isParticipant) throw Object.assign(new Error('Forbidden'), { statusCode: 403 })

    if (!match.datePlan) throw Object.assign(new Error('Date plan not found'), { statusCode: 404 })

    const timeline = buildThreeHourTimeline({
      timeStart: input.timeStart,
      timeEnd: input.timeEnd,
      venueTitle: match.datePlan.title,
      cafeTitle: 'Café & meal together (~2 hours)',
      activityTitle: 'Walk, photos & easy chat',
    })

    const timeLabel = formatScheduledDateTime(
      input.scheduledDate,
      input.timeStart,
      input.timeEnd,
    )

    const updated = await prisma.datePlan.update({
      where: { matchId },
      data: {
        scheduledDate: new Date(`${input.scheduledDate}T12:00:00`),
        timeStart: input.timeStart,
        timeEnd: input.timeEnd,
        scheduleConfirmed: true,
        time: timeLabel,
        timeline,
      },
    })

    return updated
  }
}

export const matchScheduleService = new MatchScheduleService()
