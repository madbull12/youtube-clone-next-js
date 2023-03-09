import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const commentRouter = router({
  createComment: publicProcedure
    .input(z.object({ videoId: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
        const { text,videoId } = input;
        const userId = ctx?.session?.user?.id;
        return ctx.prisma.comment.create({
            data:{
                text,
                author:{
                    connect:{
                        id:userId as string
                    }
                },
                videoId
            }
        })
    }),

    getVideoComments:publicProcedure.input(z.object({ videoId:z.string() })).query(({ ctx,input })=>{
        const { videoId } = input;

        return ctx.prisma.comment.findMany({
            where:{
                videoId
            },
            include:{
                author:true
            }
        })
    })
});
