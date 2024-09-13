import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSumarry } from '../../functions/get-week-summary';

export const getSummaryRoute: FastifyPluginAsyncZod = async app => {
    app.get('/summary', async () => {
        const { summary } = await getWeekSumarry()
        return { summary }
      })
};