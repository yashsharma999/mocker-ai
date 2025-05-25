import { fetcher } from '@/lib/constants';
import useByok from '@/lib/hooks/useByok';
import { useAuth } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';
import { Skeleton } from './ui/skeleton';

export default function CurrentCredits() {
  const { userId } = useAuth();
  const { byokUserId } = useByok();
  const { data, isLoading } = useSWR(
    byokUserId || userId
      ? `/api/credits?clerkId=${byokUserId || userId}`
      : null,
    fetcher
  );

  return (
    <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-gray-800 dark:bg-gray-950'>
      <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white'>
        <Sparkles className='h-2 w-2 text-white' />
      </div>
      <div className='flex flex-col'>
        <span className='text-xs text-gray-500 dark:text-gray-400'>
          AI Credits
        </span>
        <span className='text-sm font-semibold text-gray-900 dark:text-white'>
          {isLoading ? (
            <Skeleton className='w-16 h-4' />
          ) : byokUserId ? (
            '∞'
          ) : (
            `${data?.amount || 0} / 1000`
          )}
        </span>
      </div>
    </div>
  );
}
