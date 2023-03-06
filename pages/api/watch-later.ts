import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const { title, thumbnail, videoId, publishedAt, authorTitle } = req.body;

    const result = await prisma?.watchLater.create({
      data: {
        user: {
          connect: {
            email: session?.user?.email || "",
          },
        },
        videoId,
        thumbnail,
        title,
        publishedTimeText: publishedAt,
        authorTitle,
      },
    });
    res.status(201).json(result);
  } else if (req.method === "GET") {
    const videosList = await prisma?.watchLater.findMany({
      where: {
        user: {
          email: session?.user?.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(videosList)
  }
}
