import { FileVideo, Github, UploadIcon, Wand2 } from 'lucide-react'
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


export function App() {
  const [value, setValue] = useState<number[]>([0.5])
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
            />
            <Textarea className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA...'
              readOnly
            />
          </div>
          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável
            <code className='text-violet-400'>{'{transcription}'}</code>
            no seu prompt para adcionar o conteúdo da transcrição do conteúdo selecionado
          </p>
        </div>
        <aside className='w-80 flex flex-col gap-6'>
          <form className='flex flex-col gap-5'>
            <label htmlFor="video" className='w-full flex flex-col gap-2 items-center justify-center border border-dashed rounded-md aspect-video cursor-pointer text-sm transition-colors hover:bg-secondary/50'>
              <FileVideo strokeWidth={1} />
              Carregar vídeo
            </label>
            <input type="file" id="video" accept='video/mp4' className='sr-only' />
            <Separator />
            <div className='space-y-2'>
              <Label>Prompt de transcrição</Label>
              <Textarea id='transcription-prompt' className='h-20 leading-relaxed resize-none' placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula' />
            </div>
            <Button type='submit' className='w-full'>Carregar Vídeo <UploadIcon size={16} className='ml-2' /> </Button>
          </form>
          <Separator />
          <form className='flex flex-col gap-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <Select >
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Título do YouTube</SelectItem>
                  <SelectItem value="description">Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>

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
            <Separator/>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label>Temperatura</Label>
                <p>{value}</p>
              </div>
              <Slider defaultValue={value}
                min={0}
                max={1}
                step={0.1}
                onValueChange={setValue} />
              <span className='block text-sm text-muted-foreground italic'>Valores mais altos tendem a deixar o resultado mais criativo</span>
            </div>

            <Separator />

            <Button className='w-full'>
              Executar 
              <Wand2 size={14} className='ml-2'/>
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
