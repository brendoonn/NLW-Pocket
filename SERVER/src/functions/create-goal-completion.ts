import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'
import { error } from 'console'

interface creaetGoalCompletionRequest {
  goalId: string
}
export async function creaetGoalCompletion({
  goalId,
}: creaetGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

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
          lte(goalCompletions.createAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalCompletionCounts)
    .select({
      desireWeeklyFrequency: goals.desireWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))

  const { completionCount, desireWeeklyFrequency } = result[0]

  if (completionCount >= desireWeeklyFrequency) {
    throw new Error('Goal alredy completed this task this Week!')
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()

  const goalCompletion = result[0]

  return {
    goalCompletion,
  }
}
