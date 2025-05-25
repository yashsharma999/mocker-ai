'use client';

import FileFormat, { PreferedFileFormat } from '@/components/chat/file-format';
import MessageList from '@/components/chat/message_list';
import CustomApiKeyStatus from '@/components/custom-key-badge';
import NewChatButton from '@/components/new-chat';
import TemplateSection from '@/components/templates/template-section';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { subtractUserCredits } from '@/lib/actions';
import useByok from '@/lib/hooks/useByok';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { useAuth } from '@clerk/nextjs';
import { AlertCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { mutate } from 'swr';

export default function Home() {
  const { userId } = useAuth();
  const { byokKey, byokUserId } = useByok();
  const [preferedFileFormat, setPreferedFileFormat] =
    useState<PreferedFileFormat>('');

  const { messages, input, setInput, handleInputChange, handleSubmit, error } =
    useChat({
      maxSteps: 5,
      experimental_throttle: 100,
      onFinish: () => {
        mutate(`/api/datasource?clerkId=${byokUserId ? byokUserId : userId}`);
        subtractUserCredits({
          clerkUserId: byokUserId ? byokUserId : userId || '',
          creditsToSubtract: 5,
          byok: !!byokKey,
        });
      },
      body: {
        byok: byokKey,
        byok_user_id: byokUserId,
        file_format: preferedFileFormat,
      },
    });

  const generating = messages.length > 0;

  const handleFileFormatChange = (format: PreferedFileFormat) => {
    setPreferedFileFormat(format);
  };

  return (
    <div>
      <div
        className={cn(
          'flex flex-col items-center justify-center p-24 bg-white h-screen dark:bg-[var(--background)] text-black dark:text-white',
          {
            'justify-end pb-4 h-full max-h-screen transition-all ease-in duration-200 ':
              generating,
          }
        )}
      >
        <NewChatButton />
        <CustomApiKeyStatus />
        <div className='w-[90vw] md:w-[900px]'>
          <div
            className={cn('flex flex-col', {
              'h-[calc(100vh-200px)] overflow-y-auto p-2 mb-4 gap-6':
                generating,
            })}
          >
            {generating ? (
              <MessageList messages={messages} />
            ) : (
              <div className='flex flex-col items-center justify-center mb-8 gap-4'>
                <h1 className='text-slate-800  dark:text-slate-300 text-3xl text-center font-bold '>
                  Data Mocking Made Simple <br />
                  How can I help ?
                </h1>
                <TemplateSection handleInputChange={setInput} />
              </div>
            )}
            {error && (
              <div className='flex flex-col items-center justify-center mb-8 gap-3'>
                <div className='flex items-start gap-3 bg-amber-100 text-amber-800 px-4 py-3 rounded-lg shadow-sm max-w-md'>
                  <AlertCircle className='w-5 h-5 mt-0.5' />
                  <div>
                    <h1 className='text-base font-semibold'>{error.name}</h1>
                    <p className='text-sm mt-1'>{error.message}</p>
                  </div>
                </div>
              </div>
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
            <div className='p-2 flex justify-between items-center'>
              <FileFormat handleFileFormatChange={handleFileFormatChange} />
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
