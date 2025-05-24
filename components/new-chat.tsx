import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function NewChatButton() {
  return (
    <div className='p-4 fixed bottom-24 left-0'>
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => window.location.reload()}
            >
              <MessageSquare className='h-[1.2rem] w-[1.2rem]' />
              <span className='sr-only'>Start new chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>New Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
