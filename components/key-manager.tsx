'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Key } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { toast } from 'sonner';

export function CustomKeyManager() {
  const [key, setKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    const existingKey = localStorage.getItem('custom_api_key');
    if (existingKey) setSavedKey(existingKey);
  }, []);

  const saveKey = () => {
    if (!key.trim()) return;
    localStorage.setItem('custom_api_key', key);
    setSavedKey(key);
    toast('Key saved successfully', {
      description: 'Your custom API key has been saved.',
      action: {
        label: 'OK',
        onClick: () => {
          toast.dismiss();
        },
      },
    });
    setKey('');
  };

  const clearKey = () => {
    localStorage.removeItem('custom_api_key');
    setSavedKey(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Key className='h-2 w-2' />
          Custom Key
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attach Custom API Key</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-8'>
          <Input
            placeholder='Enter your API key'
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <div className='flex gap-2'>
            <Button onClick={saveKey}>Save</Button>
            <Button variant='outline' onClick={clearKey}>
              Clear
            </Button>
          </div>
          {savedKey && (
            <p className='text-sm text-muted-foreground'>
              Saved key: <code className='break-all'>{savedKey}</code>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
