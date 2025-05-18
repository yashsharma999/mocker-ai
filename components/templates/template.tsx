import React from 'react';

interface TemplateProps {
  name: string;
  description: string;
  tags: string[];
  handleClick?: (text: string) => void;
}

export default function Template({
  name,
  description,
  tags,
  handleClick,
}: TemplateProps) {
  return (
    <div
      className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 
      border border-transparent hover:border-gray-400 dark:hover:border-gray-600 
      transition-all duration-200 ease-in-out cursor-pointer'
      onClick={() => handleClick && handleClick(description)}
    >
      <h3 className='text-xl font-semibold mb-1'>{name}</h3>
      <p className='mb-2 text-gray-700 dark:text-gray-300'>{description}</p>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        Tags: {tags.join(', ')}
      </p>
    </div>
  );
}
