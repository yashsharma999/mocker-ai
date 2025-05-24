import { inngest } from '@/app/inggest/client';
import { syncUser } from '@/app/inggest/functions';
import { serve } from 'inngest/next';

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUser],
});
