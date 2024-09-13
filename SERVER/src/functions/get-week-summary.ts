import dayjs from 'dayjs'
import { db } from '../db'
import { and, count, desc, eq, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'
import { gte } from 'drizzle-orm'
import { createGoalCompletion } from './create-goal-completion'

export async function getWeekSumarry() {
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

  const goalsCompletedInWeek = db.$with('goals_completed_week').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createAt,
        completedAtDate: sql`DATE (${goalCompletions.createAt})`.as(
          'completedAtDate'
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .orderBy(goalCompletions.createAt)
      .where(
        and(
          gte(goalCompletions.createAt, firstDayOfWeek),
          lte(goalCompletions.createAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goal_completed_by_week_day').as(
    db
      .select({
        completeAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql`
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id' , ${goalsCompletedInWeek.id},
                    'title' , ${goalsCompletedInWeek.title},
                    'completedAt' , ${goalsCompletedInWeek.completedAt}
                )
            )
        `.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  )

  type GoalsPerDay = Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >

  const result = await db
    .with(goalsCreateUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) 
        FROM ${goalsCompletedInWeek})`.mapWith(Number),
      total: sql`(SELECT SUM(${goalsCreateUpToWeek.desireWeeklyFrequency}) 
        FROM ${goalsCreateUpToWeek})`.mapWith(Number),
      goalsPerDay: sql<GoalsPerDay>`
            JSON_OBJECT_AGG(
                ${goalsCompletedByWeekDay.completeAtDate},
                ${goalsCompletedByWeekDay.completions}
            )
        `,
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result[0],
  }
}
