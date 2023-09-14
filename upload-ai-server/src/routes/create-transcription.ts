import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from 'zod'
import { createReadStream } from "fs";
import { openai } from "../lib/openai";

// Precisa ser uma função assíncrona, pois o fastify exige q todas as rotas sejam assíncronas
export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid()
    })
    // verifica se req.params contém um objeto com a propriedade videoId
    const { videoId } = paramsSchema.parse(req.params)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    const videoPath = video.path

    const audioReadStream = createReadStream(videoPath)

    const promptSchema = z.object({
      transcriptionPrompt: z.string()
    })

    const { transcriptionPrompt } = promptSchema.parse(req.body)

    // OPEN AI

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: "json",
      temperature: 0,
      prompt: transcriptionPrompt
    })

    const transcription = response.text
    
    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription: transcription
      }
    })

    return { transcription }
  })
}