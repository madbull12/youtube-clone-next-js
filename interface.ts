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

export interface IVideoV3 {
    id:{
        kind:string;
        videoId:string
    };
    kind:string;
    snippet:ISnippet
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

export interface IAuthor {
    avatar:IAvatar[];
    badges:IBadge[];
    canonicalBaseUrl:string;
    channelId:string;
    title:string;
}

export interface IVideoInfo {
 
        author?:IAuthor;
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

export interface ICard {
    label:string;
    link:{
        displayDomain:string;
        thumbnails:IThumbnail[];
        title:string;
        url:string;
        type:string;

    }
}

export interface IStats {
    comments:number;
    likes:number;
    views:number;
}

// export interface IVideoSnippet {

// }

export interface IVideoDetails {
    author:IAuthor;
    cards:ICard[];
    category:string;
    description:string;
    publishedDate:string;
    stats:IStats;
    superTitle:{
        items:string[];
    };
    thumbnails:IThumbnail[];
    title:string;
    videoId:string;
    // publishedTimeText?:string;
    // descriptionSnippet:string;

}

export interface IVideo {
    type:string;
    video:IVideoInfo
    
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

export interface IChannel {
    type:string;
    channel:IChannelSnippet;
}

export interface IChannelSnippet {
    avatar:IAvatar[];
    badges:IBadge[];
    canonicalBaseUrl:string;
    channelId:string;
    descriptionSnippet:string;
    stats:{
        subscribers:number;
        subscribersText:string;
        videos:number;
    }
    title:string;
}

export interface IChannelDetails {
    artistBio:string | null;
    avatar:IAvatar[];
    badges:IBadge[];
    banner:{
        desktop:IResolution[];
        mobile:IResolution[];
        tv:IResolution[];

    }
    canonicalBaseUrl:string;
    channelId:string;
    country:string | null;
    description:string;
    joinedDateText:string;
    stats:{
        subscribers:number;
        subscribersText:string;
        views:number;
    };
    title:string;
}