import { router } from "../trpc";
import { commentRouter } from "./comment";
import { playlistRouter } from "./playlist";
import { watchLaterRouter } from "./watchLater";

// import { exampleRouter } from "./example";

export const appRouter = router({
    playlist:playlistRouter,
    watchLater:watchLaterRouter,
    comment:commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;