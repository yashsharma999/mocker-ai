import React from 'react';
import Template from './template';

export default function TemplateSection({
  handleInputChange,
}: {
  handleInputChange: (text: string) => void;
}) {
  const handleClick = (text: string) => {
    handleInputChange(text);
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
];
