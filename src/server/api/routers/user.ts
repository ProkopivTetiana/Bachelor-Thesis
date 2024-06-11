import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        sort: z.string().nullable().default(null),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allUsers = await ctx.prisma.user.findMany({
        orderBy: {
          id: input.sort === "asc" ? "asc" : "desc",
        },
      });
      return allUsers;
    }),

  getUserById: publicProcedure
    .input(
      z.object({
        user_id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          //   id: ctx.userId,
          id: input.user_id,
        },
      });
      return user;
    }),

  getUserFullNaameById: publicProcedure
    .input(
      z.object({
        user_id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          //   id: ctx.userId,
          id: input.user_id,
        },
      });
      const fullName = `${user?.first_name} ${user?.last_name}`;
      return fullName;
    }),
  getUserContactInfoById: publicProcedure
    .input(
      z.object({
        user_id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          //   id: ctx.userId,
          id: input.user_id,
        },
      });
      const contactInfo = `${user?.contact_info}`;
      return contactInfo;
    }),

  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        contact_info: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
          first_name: input.first_name,
          last_name: input.last_name,
          contact_info: input.contact_info,
        },
      });
      return user;
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        email: z.string(),
        password: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        contact_info: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          email: input.email,
          password: input.password,
          first_name: input.first_name,
          last_name: input.last_name,
          contact_info: input.contact_info,
        },
      });
      return user;
    }),

  deleteUser: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.delete({
        where: {
          id: input.user_id,
        },
      });
      return user;
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      if (user.password !== input.password) {
        throw new Error("Invalid email or password");
      }

      return user;
    }),
});
