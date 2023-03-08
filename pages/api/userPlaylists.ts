import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const userPlaylists = await prisma.playlist.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      saved: true,
    },
  });
  res.status(200).json(userPlaylists);
}
