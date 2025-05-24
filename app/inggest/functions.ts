import { prisma } from '@/lib/prisma';
import { inngest } from './client';

export const syncUser = inngest.createFunction(
  { id: 'sync-user-from-clerk' }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: 'clerk/user.created' }, // ← This is the function's triggering event
  async ({ event }) => {
    const user = event.data; // The event payload's data will be the Clerk User json object
    const { id, first_name, last_name } = user;
    const email = user.email_addresses.find(
      (e: any) => e.id === user.primary_email_address_id
    ).email_address;

    // generate a new user profile in our database
    const userProfile = await prisma.user.create({
      data: {
        clerkId: id,
        name: '' + (first_name || '') + ' ' + (last_name || ''),
        email: email,
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
  }
);
