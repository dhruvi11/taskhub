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

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUser(
    id: string,
    data: {
      name?: string;
      avatarUrl?: string;
    }
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}