import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const watchLaterRouter = router({
  userWatchLater: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;

    return ctx.prisma.watchLater.findMany({
      where: {
        userId,
      },
    });
  }),
  saveToWatchLater: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
        thumbnail: z.string(),
        title: z.string(),
        authorTitle: z.string(),
        publishedTimeText: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { videoId, thumbnail, title, authorTitle, publishedTimeText } =
        input;
        const userId = ctx?.session?.user?.id;
      return ctx.prisma.watchLater.create({
        data: {
          videoId,
          thumbnail,
          title,
          authorTitle,
          publishedTimeText,
          user:{
            connect:{
                id:userId as string
            }
          }
        },
      });
    }),
});
