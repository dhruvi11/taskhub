import { prisma } from "../config/prisma";
import {
  CreateProjectInput,
  ProjectListQuery,
  UpdateProjectInput,
} from "../module/project/project.validation";

export class ProjectRepository {
  async create(
    data: CreateProjectInput & {
      ownerId: string;
    }
  ) {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
      },
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: UpdateProjectInput
  ) {
    return prisma.project.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async findMany(
    ownerId: string,
    query: ProjectListQuery
  ) {
    const {
      page,
      limit,
      search,
      status,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    const where = {
      ownerId,

      ...(status && {
        status,
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),
    };

    const [projects, total] =
      await prisma.$transaction([
        prisma.project.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            [sortBy]: sortOrder,
          },
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),

        prisma.project.count({
          where,
        }),
      ]);

    return {
      projects,
      total,
    };
  }
}