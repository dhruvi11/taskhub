import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",

  info: {
    title: "TaskHub API",
    version: "1.0.0",
    description:
      "Production-ready REST API for TaskHub project and task management",
  },

  servers: [
    {
      url: "http://localhost:5050",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "API health checks",
    },
    {
      name: "Authentication",
      description: "Authentication APIs",
    },
    {
      name: "Users",
      description: "User APIs",
    },
    {
      name: "Projects",
      description: "Project management APIs",
    },
    {
      name: "Project Members",
      description: "Project membership APIs",
    },
    {
      name: "Tasks",
      description: "Task management APIs",
    },
  ],

  components: {
    parameters: {
      ProjectId: {
        name: "projectId",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" },
      },
      TaskId: {
        name: "taskId",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" },
      },
      UserId: {
        name: "userId",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" },
      },
    },

    responses: {
      Unauthorized: {
        description: "Authentication is required or the token is invalid.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      Forbidden: {
        description:
          "The authenticated user does not have permission for this action.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      ValidationError: {
        description: "The request data failed validation.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      User: {
        type: "object",

        properties: {
          id: {
            type: "string",
            format: "uuid",
          },

          name: {
            type: "string",
          },

          email: {
            type: "string",
            format: "email",
          },

          role: {
            type: "string",
            enum: ["USER", "ADMIN"],
          },

          avatarUrl: {
            type: "string",
            nullable: true,
          },
        },
      },

      Project: {
        type: "object",

        properties: {
          id: {
            type: "string",
            format: "uuid",
          },

          name: {
            type: "string",
          },

          description: {
            type: "string",
            nullable: true,
          },

          ownerId: {
            type: "string",
            format: "uuid",
          },

          status: {
            type: "string",
            enum: ["ACTIVE", "ARCHIVED"],
          },

          createdAt: {
            type: "string",
            format: "date-time",
          },

          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Task: {
        type: "object",

        properties: {
          id: {
            type: "string",
            format: "uuid",
          },

          title: {
            type: "string",
          },

          description: {
            type: "string",
            nullable: true,
          },

          status: {
            type: "string",
            enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
          },

          priority: {
            type: "string",
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
          },

          dueDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          projectId: {
            type: "string",
            format: "uuid",
          },

          createdById: {
            type: "string",
            format: "uuid",
          },

          assignedToId: {
            type: "string",
            format: "uuid",
            nullable: true,
          },

          createdAt: {
            type: "string",
            format: "date-time",
          },

          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Error: {
        type: "object",

        properties: {
          success: {
            type: "boolean",
            example: false,
          },

          code: {
            type: "string",
            example: "VALIDATION_ERROR",
          },

          message: {
            type: "string",
            example: "Validation failed",
          },
        },
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
};

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,

  apis: ["./src/app.ts", "./src/routes/*.ts"],
});
