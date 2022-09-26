export interface ISnippet {
    channelId:string;
    channelTitle:string;
    description:string;
    publishTime:Date;
    publishedAt:Date;
    thumbnails:{
        default:IResolution;
        high:IResolution;
        medium:IResolution;
    };
    title:string;

}

export interface IAvatar {
    height:number;
    url:string;
    width:number;
}

export interface IBadge {
    text:string;
    type:string;
}

export interface IThumbnail{
    height:number;
    url:string;
    width:number;
}

export interface IVideoDetails {
   
 
}

export interface IVideo {
    type:string;
    video:{
        author:{
            avatar:IAvatar[];
            badges:IBadge[];
            canonicalBaseUrl:string;
            channelId:string;
            title:string;
        };
        badges:string[];
        descriptionSnippet:string;
        isLiveNow:boolean;
        lengthSeconds:number;
        publishedTimeText:string;
        stats:{
            views:number;
        };
        thumbnails:IThumbnail[];
        title:string;
        videoId:string;
    }
    
    // kind:string;
    // id:{
    //     kind:string;
    //     videoId:string;
    // }
    // snippet:ISnippet;

}

export interface IResolution {
    height:number;
    url:string;
    width:string;
}

// export interface IComment {
//     id:string;
//     kind:string;
//     snippet: {
//         topLevelComment:{
//             id:string;
//             kind:string;
//             snippet:{
//                 authorChannelId:{
//                     value:string;
//                 };
//                 authorChannelUrl:string;
//                 authorDisplayName:string;
//                 authorProfileImageUrl:string;
//                 likeCount:number;
//                 publishedAt:Date;
//                 textDisplay:string;
//                 videoId:string;

//             }
//         }
//     }
// }

export interface IUser {
    id:string;
    name:string;
    email:string;
    image:string;
    comments:IComment[]
}

export interface IComment {
    id:string;
    createdAt:Date;
    updatedAt:Date;
    text:string;
    authorId:string;
    videoId:string;
    author:IUser;

}