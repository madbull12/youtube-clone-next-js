import { Prisma } from "@prisma/client"

export type PlaylistWithPayload = Prisma.PlaylistGetPayload<{
    include:{
      saved:true,
      user:true
    }
  }>



export type CommentWithPayload = Prisma.CommentGetPayload<{
  include:{
    author:true
  }
}>

// export type SavedWithPayload = Prisma.SavedVideoGetPayload<{

// }>