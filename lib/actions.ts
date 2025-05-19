'use server';

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

// export async function getDataSourcesForUser(userId: string) {
//   try {
//     const dataSources = await prisma.dataSource.findMany({
//       where: {
//         userId: userId,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       select: {
//         id: true,
//         name: true,
//         type: true,
//         url: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return { data: dataSources };
//   } catch (error) {
//     console.error('Failed to fetch data sources:', error);
//     return { error: 'Failed to fetch data sources' };
//   }
// }
