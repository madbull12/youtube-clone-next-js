import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const {
      privacy,
      thumbnail,
      playlistName,
      videoId,
      title,
      publishedTimeText,
      authorTitle,
    } = req.body;

    console.log(req.body)

    console.log(session);
    const result = await prisma?.playlist.create({
      data: {
        title: playlistName,
        privacy,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        saved:{
            create:{
                user:{
                  connect:{
                    email:session?.user?.email as string
                  }
                },
                videoId,
                thumbnail,
                title,
                publishedTimeText,
                authorTitle,
                

             },

        }
      },
    });
    res.status(201).json(result);
  } 
}
