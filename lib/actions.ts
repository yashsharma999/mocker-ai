'use server';

import { prisma } from './prisma';

interface UpdateCreditsParams {
  clerkUserId: string;
  creditsToSubtract: number;
  byok?: boolean;
}

export async function subtractUserCredits({
  clerkUserId,
  creditsToSubtract,
  byok = false,
}: UpdateCreditsParams) {
  if (byok) {
    return;
  }
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

export async function createBYOKCustomer({
  byokCustomerId,
}: {
  byokCustomerId: string;
}) {
  try {
    // generate a new user profile in our database
    const userProfile = await prisma.user.create({
      data: {
        clerkId: byokCustomerId,
        name: '',
        email: byokCustomerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // generate the credits for the user
    await prisma.credits.create({
      data: {
        userId: userProfile.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: userProfile,
    };
  } catch (error) {
    console.error('Error creating BYOK customer:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create BYOK customer',
    };
  }
}

export async function deleteBYOKCustomer({
  byokCustomerId,
}: {
  byokCustomerId: string;
}) {
  try {
    // Find the user first to get their ID
    const user = await prisma.user.findUnique({
      where: { clerkId: byokCustomerId },
      select: { id: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete credits first due to foreign key constraint
    await prisma.credits.delete({
      where: { userId: user.id },
    });

    // Delete any associated data sources
    await prisma.dataSource.deleteMany({
      where: { userId: user.id },
    });

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id: user.id },
    });

    return {
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    console.error('Error deleting BYOK customer:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to delete BYOK customer',
    };
  }
}
