import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { GenerateAICompletionRoute } from './routes/generate-ai-completion'
const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

// declarando rotas
app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(GenerateAICompletionRoute)
app.listen({ port: 8080, })
  .then(() => {
    console.log(`Server is running on http://localhost:8080`)
  })