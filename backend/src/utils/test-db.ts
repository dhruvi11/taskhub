import { prisma } from '../config/prisma';

async function testDatabase() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'TaskHub Demo',
        email: 'demo@taskhub.com',
      },
    });

    console.log('✅ User created:', user);
  } catch (error) {
    console.error('❌ Database operation failed');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();