import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const playlistRouter = router({
  userPlaylists: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;

    return ctx.prisma.playlist.findMany({
      where: {
        userId,
      },
      include: {
        saved: true,
        user:true
      },
    });
  }),
  playlistDetails: publicProcedure
    .input(z.object({ playlistId: z.string() }))
    .query(({ ctx, input }) => {
      const { playlistId } = input;

      return ctx.prisma.playlist.findUnique({
        where: {
          id: playlistId as string,
        },
        include: {
          saved: true,
          user:true
        },
      });
    }),
});
