import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clerkId = url.searchParams.get('clerkId');

    if (!clerkId) {
      return new Response('Clerk ID is required', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: { id: true },
    });
    const userId = user?.id;

    if (!userId) {
      return new Response('User not found', { status: 404 });
    }

    const credits = await prisma.credits.findUnique({
      where: { userId: userId },
      select: { amount: true },
    });

    if (!credits) {
      return new Response('Credits not found for user', { status: 404 });
    }

    return new Response(JSON.stringify({ amount: credits.amount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch credits:', error);
    return new Response('Failed to fetch credits', { status: 500 });
  }
}
