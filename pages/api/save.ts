import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      thumbnail,
      videoId,
      title,
      publishedTimeText,
      authorTitle,
      playlistId
    } = req.body;

    const session = await getSession({ req });
    console.log(req.body)

    console.log(session);
    const result = await prisma?.savedVideo.create({
      data: {
        thumbnail,
        videoId,
        title,
        publishedTimeText,
        authorTitle,
        user:{
            connect:{
                email:session?.user?.email as string
            }
        },
        playlist:{
            connect: {
                id:playlistId
            }
        }
      },
    });
    res.status(201).json(result);
  }
}
