import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clerkId = url.searchParams.get('clerkId');

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId || '' },
      select: { id: true },
    });
    const userId = user?.id;

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const dataSources = await prisma.dataSource.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        type: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return new Response(JSON.stringify(dataSources), {
      status: 200,
    });
  } catch (error) {
    console.error('Failed to fetch data sources:', error);
    return new Response('Failed to fetch data sources', { status: 500 });
  }
}
