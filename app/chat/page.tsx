'use client';

import ModeToggle from '@/components/theme-toggle';
import ToolView from '@/components/tool-view';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      setGenerating(true);
    }
  }, [messages]);

  return (
    <div>
      <div
        className={cn(
          'flex flex-col items-center justify-center p-24 bg-white h-screen dark:bg-gray-900 text-black dark:text-white',
          {
            'justify-end pb-4 h-full max-h-screen transition-all ease-in duration-200 ':
              generating,
          }
        )}
      >
        <ModeToggle />
        <div className='w-[90vw] md:w-[800px]'>
          <div
            className={cn('flex flex-col', {
              'h-[calc(100vh-200px)] overflow-y-auto p-2 mb-4 gap-6':
                generating,
            })}
          >
            {generating ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('whitespace-pre-wrap px-4', {
                    'bg-gray-100 p-4 dark:bg-gray-800 rounded-lg mb-4 w-[70%] text-left self-end':
                      message.role === 'user',
                  })}
                >
                  {/* <div className='h-fit rounded-md flex items-center justify-center'>
                    {message.role === 'user' ? (
                      <UserIcon className='mt-1 w-6 h-6 text-purple-500' />
                    ) : (
                      <BotIcon className='mt-1 w-6 h-6 text-purple-500' />
                    )}
                  </div> */}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Markdown key={`${message.id}-${i}`}>
                            {part.text}
                          </Markdown>
                        );
                      case 'tool-invocation':
                        return (
                          <ToolView
                            toolInvocation={part.toolInvocation}
                            key={`${message.id}-${i}`}
                          />
                        );
                    }
                  })}
                </div>
              ))
            ) : (
              <h1 className='text-slate-800 dark:text-slate-300 text-3xl text-center font-bold mb-6'>
                Data Mocking Made Simple <br />
                How can I help ?
              </h1>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className='w-full border-[1px] border-gray-300 dark:border-gray-700 rounded-lg'
          >
            <Textarea
              className='!text-[1.025rem]  opacity-90 !bg-transparent resize-none focus-visible:ring-0 focus-visible:border-0 border-0 ring-0 shadow-none focus:outline-none focus:ring-0'
              rows={4}
              id='input'
              placeholder='Add your requirements here...'
              style={{
                overflowY: 'auto',
                maxHeight: '10em',
              }}
              value={input}
              onChange={handleInputChange}
            />
            <div className='p-2 flex justify-end'>
              <Button
                type='submit'
                className='cursor-pointer'
                size={'sm'}
                variant={'outline'}
                disabled={input.length === 0}
              >
                <Send />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
