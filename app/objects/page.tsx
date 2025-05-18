'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { dataSchema } from '../api/generate_schema/schema';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/generate_schema',
    schema: dataSchema,
  });

  return (
    <div>
      <button
        onClick={() =>
          submit('Healtcahare data schema for a hospital management system')
        }
      >
        Generate Tables
      </button>

      {object?.tables?.map((table, index) => (
        <ol key={index}>
          <li>
            <strong>{table?.name}</strong>
            {table?.columns?.map((column, index) => (
              <ul key={index}>
                <li>{`${column?.name} - (${column?.type})`}</li>
              </ul>
            ))}
            <p>{table?.description}</p>
          </li>
        </ol>
      ))}
    </div>
  );
}
