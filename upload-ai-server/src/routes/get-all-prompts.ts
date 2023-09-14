import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

// Precisa ser uma função assíncrona, pois o fastify exige q todas as rotas sejam assíncronas
export async function getAllPromptsRoute(app: FastifyInstance){
  app.get('/prompts', async () => {
    const prompts = await prisma.prompt.findMany({})
    return prompts
  })
}