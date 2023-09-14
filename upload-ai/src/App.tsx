import { Github, Wand2 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from './components/ui/slider'
import { useState } from 'react'
import { VideoInputForm } from './components/ui/video-input-form'
import { PromptSelect } from './components/ui/prompt-select'
import { useCompletion } from 'ai/react'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:8080/ai/generate',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })

  function handlePromptSelected(template: string) {
    console.log(template)
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col'>
      <header className='px-7 py-3 flex justify-between items-center border-b'>
        <h1 className='text-xl font-bold'>upload.ai</h1>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>Desenvolvido com 💜 no NLW da Rocketseat</span>
          <Separator orientation='vertical' className='h-6' />
          <Button variant={'outline'}>
            <Github className='h-4 w-4 mr-2' />
            Github
          </Button>
        </div>
      </header>
      <main className='flex-1 p-6 flex gap-6'>
        <div className='flex flex-col gap-5 flex-1'>
          <div className="flex-1 grid grid-rows-2 gap-5">
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA...'
              readOnly
              value={completion}
            />
          </div>
          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável
            <code className='text-violet-400'>{'{transcription}'}</code>
            no seu prompt para adcionar o conteúdo da transcrição do conteúdo selecionado
          </p>
        </div>
        <aside className='w-80 flex flex-col gap-6'>
          <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />

            </div>
            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select defaultValue="gpt3" disabled>
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-sm text-muted-foreground italic'>Você poderá customizar essa função em breve</span>
            </div>
            <Separator />
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label>Temperatura</Label>
                <p>{temperature}</p>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])} />
              <span className='block text-sm text-muted-foreground italic'>Valores mais altos tendem a deixar o resultado mais criativo</span>
            </div>

            <Separator />

            <Button disabled={isLoading} className='w-full'>
              Executar
              <Wand2 size={14} className='ml-2' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
