import { prisma } from "../config/prisma";

export class UserRepository {
  async createUser(name: string, email: string) {
    return prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateById(
    id: string,
    data: {
      name?: string;
      email?: string;
      avatarUrl?: string;
    },
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateUserAvatar(userId: string, avatarUrl: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
      },
    });
  }



async findUserById  (
  userId: string
) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      role: true,
    },
  });
};

}
