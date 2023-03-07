import { router } from "../trpc";
import { playlistRouter } from "./playlist";
import { watchLaterRouter } from "./watchLater";

// import { exampleRouter } from "./example";

export const appRouter = router({
    playlist:playlistRouter,
    watchLater:watchLaterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;