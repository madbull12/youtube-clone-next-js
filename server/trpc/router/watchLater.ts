import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const watchLaterRouter = router({
    userWatchLater:publicProcedure.query(({ ctx })=>{
        const userId = ctx.session?.user?.id;

        return ctx.prisma.watchLater.findMany({
            where:{
                userId,
            },
            
        })
    })
})