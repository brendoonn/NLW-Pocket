import { Plus } from 'lucide-react'
import { OutlineButton } from './outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../../http/get-pending-goals'
import { CreateGoalCompletion } from '../../http/create-goal-completion'
import { Summary } from '../summary'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalID: string) {
    await CreateGoalCompletion(goalID)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desireWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className=" size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
