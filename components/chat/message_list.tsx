import { cn } from '@/lib/utils';
import { Message } from 'ai';
import React from 'react';
import MessageBlock from './message';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn('whitespace-pre-wrap px-4', {
            'bg-gray-100 p-4 dark:bg-gray-800 rounded-lg mb-4 w-[70%] text-left self-end':
              message.role === 'user',
          })}
        >
          <MessageBlock message={message} key={message.id} />
        </div>
      ))}
    </>
  );
}
