'use server';

import { prisma } from './prisma';

interface UpdateCreditsParams {
  clerkUserId: string;
  creditsToSubtract: number;
}

export async function subtractUserCredits({
  clerkUserId,
  creditsToSubtract,
}: UpdateCreditsParams) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    const userId = user?.id;

    // Validate inputs
    if (!userId || creditsToSubtract < 0) {
      throw new Error('Invalid input parameters');
    }

    const credits = await prisma.credits.findUnique({
      where: { userId },
    });

    if (!credits) {
      throw new Error('No credits found for user');
    }

    if ((credits?.amount ?? 0) < creditsToSubtract) {
      throw new Error('Insufficient credits');
    }

    // Subtract credits from current balance
    const updatedCredits = await prisma.credits.update({
      where: { userId },
      data: {
        amount: credits.amount - creditsToSubtract,
      },
    });

    return {
      success: true,
      data: updatedCredits,
    };
  } catch (error) {
    console.error('Error updating user credits:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update user credits',
    };
  }
}
