'use client';

import * as React from 'react';
import { LogIn, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomKeyManager } from './key-manager';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

export default function SettingsToggle() {
  const { isSignedIn } = useUser();
  return (
    <div className='p-4 fixed bottom-12 left-0'>
      {' '}
      {/* Adjust left position if needed */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Settings className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Open settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <CustomKeyManager />
          {/* <DropdownMenuItem onClick={() => alert('Account clicked')}>
            Account
          </DropdownMenuItem> */}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LogIn className='h-2 w-2' />
            {isSignedIn ? <SignOutButton /> : <SignInButton mode='modal' />}
          </DropdownMenuItem>
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserButton />
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
