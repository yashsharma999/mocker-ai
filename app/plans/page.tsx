'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

export default function PlansPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-white dark:bg-[var(--background)] text-black dark:text-white'>
      <Card className='w-80'>
        <CardHeader>
          <CardTitle className='text-xl'>Pro Plan</CardTitle>
          <div className='text-3xl font-bold'>
            $19<span className='text-sm font-normal text-gray-600'>/mo</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className='space-y-3'>
            {proPlanList.map((item, index) => (
              <li key={index} className='flex items-center text-gray-600'>
                <Check className='w-5 h-5 mr-2 text-green-500' />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full cursor-pointer'
            variant='default'
            onClick={() => {
              toast('Upgrade to Pro plan is currently unavailable.', {
                description: 'Please check back later or contact support.',
                duration: 5000,
                action: {
                  label: 'Got it',
                  onClick: () => toast.dismiss(),
                },
              });
            }}
          >
            Upgrade to Pro
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const proPlanList = [
  'Schema to Synthetic Data Generation',
  'Automated Data Ingestion',
  'Web Search Integration',
  'PostgreSQL Integration',
  'Google Sheets Integration',
  'Custom API Endpoints',
  'Priority Support',
  '10,000 AI Credits',
];
