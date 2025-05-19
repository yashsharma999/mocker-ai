import React, { useState } from 'react';
import Template from './template';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export default function TemplateSection({
  handleInputChange,
}: {
  handleInputChange: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (text: string) => {
    handleInputChange(text);
    setOpen(false); // Close the dialog after selecting a template
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'} className='cursor-pointer'>
            View Templates
          </Button>
        </DialogTrigger>
        <DialogContent className='md:min-w-[900px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='mb-2'>Templates</DialogTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              {templates.map((template, index) => (
                <Template
                  key={index}
                  name={template.name}
                  description={template.description}
                  tags={template.tags}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

const templates = [
  {
    name: 'Synthetic Transaction Data',
    description:
      'Generate realistic synthetic transaction data for FinTech use cases like fraud detection, budgeting, and payment systems — include merchant categories, timestamps, and user behavior patterns.',
    tags: ['Finance', 'Transaction'],
  },
  {
    name: 'Healthcare Data',
    description: `Generate HIPAA-safe synthetic patient records for healthcare analytics, research, and system testing — include demographics, diagnoses, treatments, and visit timelines without exposing real patient data.`,
    tags: ['Healthcare', 'Patient'],
  },
  {
    name: 'E-commerce User Activity',
    description:
      'Create synthetic user behavior data for online shopping platforms — simulate product views, cart additions, checkouts, returns, and user preferences across categories for personalization and recommendation engines.',
    tags: ['E-commerce', 'User Behavior'],
  },
  {
    name: 'HR & Employee Records',
    description:
      'Generate synthetic HR datasets for workforce analytics, onboarding systems, or compliance testing — include employee demographics, job roles, salaries, promotion history, and performance reviews.',
    tags: ['HR', 'Employee'],
  },
];
