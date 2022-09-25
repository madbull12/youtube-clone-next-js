import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "POST") {
        const { text } = req.body;

        const session = await getSession({ req });
      
        const result = await prisma?.comment.create({
          data: {
            text,
            author:{
              connect:{
                email:session?.user?.email || ""
              }
            },
          },
        });
        res.status(201).json(result);
    }

}
