import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        sort: z.string().nullable().default(null),
      }),
    )
    .query(async ({ ctx, input }) => {
      // const allPosts =
      const allPosts = await ctx.prisma.post.findMany({
        orderBy: {
          id: input.sort === "asc" ? "asc" : "desc",
        },
      });
      return allPosts;
    }),

  getAllUserPosts: publicProcedure
    .input(
      z.object({
        sort: z.string().nullable().default(null),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allUserPosts = await ctx.prisma.post.findMany({
        where: {
          user_id: input.userId,
          // user_id: ctx.userId,
        },
        orderBy: {
          id: input.sort === "asc" ? "asc" : "desc",
        },
      });
      return allUserPosts;
    }),

  getAllPostsByCategoryId: publicProcedure
    .input(
      z.object({
        category_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allCategoryPosts = await ctx.prisma.post.findMany({
        where: {
          category_id: {
            has: input.category_id,
          },
        },
      });
      return allCategoryPosts;
    }),

  getNewPosts: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allNewPosts = await ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: input.count,
      });
      return allNewPosts;
    }),

  getRecommendedPostsStart: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allRecommendedPosts = await ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: input.count,
      });
      return allRecommendedPosts;
    }),

  getPostById: publicProcedure
    .input(
      z.object({
        post_id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id,
        },
      });
      return post;
    }),

  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        book_author: z.string(),
        publication_year: z.string(),
        description: z.string(),
        time: z.string(),
        photo: z.string(),
        category_id: z.array(z.string()),
        user_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          book_author: input.book_author,
          publication_year: input.publication_year,
          description: input.description,
          time: input.time,
          photo: input.photo,
          category_id: input.category_id,
          user_id: input.user_id,
          // user_id: ctx.userId,
        },
      });
      return post;
    }),

  updatePost: publicProcedure
    .input(
      z.object({
        post_id: z.string(),
        title: z.string(),
        book_author: z.string(),
        publication_year: z.string(),
        description: z.string(),
        time: z.string(),
        photo: z.string(),
        view_id: z.array(z.string()),
        category_id: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: {
          id: input.post_id,
        },
        data: {
          title: input.title,
          book_author: input.book_author,
          publication_year: input.publication_year,
          description: input.description,
          time: input.time,
          photo: input.photo,
          view_id: input.view_id,
          category_id: input.category_id,
        },
      });
      return post;
    }),

  deletePost: publicProcedure
    .input(
      z.object({
        post_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.delete({
        where: {
          id: input.post_id,
        },
      });
      return post;
    }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),

  updatePostView: publicProcedure
    .input(
      z.object({
        post_id: z.string(),
        view_id: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: {
          id: input.post_id,
        },
        data: {
          view_id: input.view_id,
        },
      });
      return post;
    }),

  getRecommendedPostsGGG: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: { post_list: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      let recommendedPosts;

      if (user.post_list.length > 0) {
        const categories = user.post_list.flatMap((post) => post.category_id);
        recommendedPosts = await ctx.prisma.post.findMany({
          where: {
            AND: [
              {
                category_id: {
                  hasSome: categories,
                },
              },
              {
                user_id: {
                  not: user.id,
                },
              },
            ],
          },
          take: input.count,
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        recommendedPosts = await ctx.prisma.post.findMany({
          take: input.count,
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return recommendedPosts;
    }),

  getRecommendedPosts: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: { post_list: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      let recommendedPosts;

      if (user.post_list.length > 0) {
        // User has posts
        const categoryCount: Record<string, number> = {};

        user.post_list.forEach((post) => {
          post.category_id.forEach((categoryId) => {
            categoryCount[categoryId] = (categoryCount[categoryId] ?? 0) + 1;
          });
        });

        const sortedCategories = Object.keys(categoryCount).sort(
          (a, b) => (categoryCount[b] ?? 0) - (categoryCount[a] ?? 0),
        );

        recommendedPosts = await ctx.prisma.post.findMany({
          where: {
            AND: [
              // {
              //   category_id: {
              //     hasSome: sortedCategories,
              //   },
              // },
              {
                user_id: {
                  not: user.id,
                },
              },
            ],
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: input.count,
        });

        // Sort recommendedPosts by categories first, then by view count
        recommendedPosts = recommendedPosts.sort((a, b) => {
          const categoryPriorityA = sortedCategories.findIndex((cat) =>
            a.category_id.includes(cat),
          );
          const categoryPriorityB = sortedCategories.findIndex((cat) =>
            b.category_id.includes(cat),
          );

          if (categoryPriorityA !== categoryPriorityB) {
            return categoryPriorityA - categoryPriorityB;
          }

          return b.view_id.length - a.view_id.length;
        });
      } else {
        // User has no posts
        // Fetch categories from posts the user has viewed
        const viewedPosts = await ctx.prisma.post.findMany({
          where: {
            view_id: {
              has: user.id,
            },
          },
          select: {
            category_id: true,
          },
        });

        const viewedCategories = viewedPosts.flatMap(
          (post) => post.category_id,
        );
        const uniqueViewedCategories = Array.from(new Set(viewedCategories));

        recommendedPosts = await ctx.prisma.post.findMany({
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: input.count,
        });

        recommendedPosts = recommendedPosts.sort((a, b) => {
          const viewCountA = a.view_id.length;
          const viewCountB = b.view_id.length;

          if (viewCountA !== viewCountB) {
            return viewCountB - viewCountA;
          }

          const categoryPriorityA = uniqueViewedCategories.findIndex((cat) =>
            a.category_id.includes(cat),
          );
          const categoryPriorityB = uniqueViewedCategories.findIndex((cat) =>
            b.category_id.includes(cat),
          );

          return categoryPriorityA - categoryPriorityB;
        });
      }

      return recommendedPosts;
    }),
});
