import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
const util = require('node:util')
const { pipeline } = require('node:stream')
const pump = util.promisify(pipeline)

// Precisa ser uma função assíncrona, pois o fastify exige q todas as rotas sejam assíncronas
export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25 // 25mb
    }
  })

  app.post('/videos', async (req, reply) => {
    const data = await req.file()

    if (!data) {
      reply.status(400).send({ error: 'Missing file input.' })
    }

    // Apenas arquivos com extensão mp4
    const extension = path.extname(data.filename)

    if (extension !== '.mp4') {
      return reply.status(400).send({ error: 'Invalid input type. Please upload a MP4' })
    }

    // Caso tenham arquivos c o msm nome, serão gerados nomes de arquivo aleatórios
    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const uploadDestination = path.resolve(__dirname, '../../temp', fileUploadName)

    // O que é stream
    // Não espera fazer o upload total para salvar
    //Vai salvando o arquivo aos poucos
    // economiza memória ram
    // melhora performance

    // Espera q os 2 processos estejam prontos
    await pump(data.file, fs.createWriteStream(uploadDestination))


    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      }
    })

    return { video }
  })
}