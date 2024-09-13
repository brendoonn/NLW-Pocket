import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/createGoals'
import { getPendingGoalRoute } from './routes/getPendingGoals'
import { createGoalCompletionRoute } from './routes/createCompletions'
import { getSummaryRoute} from './routes/getWeekSummary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})
// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalRoute)
app.register(getSummaryRoute)


app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running')
  })
