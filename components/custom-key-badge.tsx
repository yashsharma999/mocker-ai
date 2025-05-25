import { Card, CardContent } from '@/components/ui/card';
import useByok from '@/lib/hooks/useByok';

export default function CustomApiKeyStatus() {
  const { byokKey } = useByok();
  if (!byokKey) {
    return null; // Don't render the badge if no custom API key is set
  }
  return (
    <Card className='w-fit border border-muted bg-muted/30 shadow-none  py-2 px-4 absolute top-2 right-16'>
      <CardContent className='flex items-center space-x-2 p-0'>
        <span className='relative h-3 w-3 flex items-center'>
          {/* Glowing dot */}
          <span className='absolute inline-block h-2 w-2 rounded-full bg-green-500 z-10' />
          <span className='absolute inline-block h-3 w-3 rounded-full bg-green-400 blur-sm opacity-70 animate-pulse' />
        </span>
        <span className='text-sm text-muted-foreground font-medium'>
          Custom API Key
        </span>
      </CardContent>
    </Card>
  );
}
