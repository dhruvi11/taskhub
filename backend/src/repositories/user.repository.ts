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
}