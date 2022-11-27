import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "POST") {

        const { title,thumbnail,videoId,publishedAt,authorTitle } = req.body;
        const session = await getSession({ req });
      
        const result = await prisma?.watchLater.create({
          data:{
            
          
            user:{
                connect:{
                  email:session?.user?.email || ""
                }
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
                  publishedTimeText:publishedAt,
                  authorTitle,
                  
  
               },
  
          }
          }
        });
        res.status(201).json(result);
    }

}
