import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { and, count, eq, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'
import { gte } from 'drizzle-orm'
import { numeric } from 'drizzle-orm/pg-core'

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  //const curretWeek = dayjs().week

  const goalsCreateUpToWeek = db.$with('goals_create_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desireWeeklyFrequency: goals.desireWeeklyFrequency,
        createAt: goals.createAt,
      })
      .from(goals)
      .where(lte(goals.createAt, lastDayOfWeek))
  )

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createAt, firstDayOfWeek),
          lte(goalCompletions.createAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreateUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreateUpToWeek.id,
      title: goalsCreateUpToWeek.title,
      desireWeeklyFrequency: goalsCreateUpToWeek.desireWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goalsCreateUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreateUpToWeek.id)
    )

  return {
    pendingGoals,
  }
}
