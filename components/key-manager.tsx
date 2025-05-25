'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Key } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { createBYOKCustomer, deleteBYOKCustomer } from '@/lib/actions';
import { BYOK_API_KEY } from '@/lib/constants';

export function CustomKeyManager() {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [removingKeys, setRemovingKeys] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    const existingKey = localStorage.getItem('custom_api_key');
    if (existingKey) setSavedKey(existingKey);
  }, []);

  const saveKey = async () => {
    try {
      setLoading(true);
      if (!key.trim()) return;
      const byokCusId = uuidv4();

      localStorage.setItem(BYOK_API_KEY, key);
      localStorage.setItem('byok_cus_id', byokCusId);

      await createBYOKCustomer({
        byokCustomerId: byokCusId,
      }).catch((error) => {
        console.error('Error creating BYOK customer:', error);
        toast.error('Failed to save key', {
          description: 'There was an error saving your custom API key.',
        });
        return;
      });

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
    } catch (error) {
      console.error('Error saving key:', error);
      toast.error('Failed to save key', {
        description: 'There was an error saving your custom API key.',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearKey = async () => {
    try {
      if (!savedKey?.trim()) return;
      setRemovingKeys(true);
      await deleteBYOKCustomer({
        byokCustomerId: localStorage.getItem('byok_cus_id') || '',
      }).catch((error) => {
        console.error('Error deleting BYOK customer:', error);
        toast.error('Failed to clear key', {
          description: 'There was an error clearing your custom API key.',
        });
        return;
      });

      localStorage.removeItem(BYOK_API_KEY);
      localStorage.removeItem('byok_cus_id');

      setSavedKey(null);
    } catch (error) {
      console.error('Error clearing key:', error);
      toast.error('Failed to clear key', {
        description: 'There was an error clearing your custom API key.',
      });
    } finally {
      setRemovingKeys(false);
    }
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
          <DialogDescription>
            {`Only OpenAI keys are supported right now. The api keys are stored in
            your browser's local storage and are not sent to the server.`}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-8'>
          <Input
            placeholder='Enter your API key'
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <div className='flex gap-2'>
            <Button
              onClick={saveKey}
              disabled={loading}
              className='cursor-pointer'
            >
              {loading ? `Saving...` : `Save Key`}
            </Button>
            <Button
              variant='outline'
              onClick={clearKey}
              disabled={removingKeys}
              className='cursor-pointer'
            >
              {removingKeys ? `Removing...` : `Remove Key`}
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
