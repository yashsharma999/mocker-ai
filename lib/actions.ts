'user server';

import { prisma } from './prisma';

export async function createUser() {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: 'example@email.com',
        name: 'John Doe',
      },
    });
    console.log('User created successfully:', newUser);
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
