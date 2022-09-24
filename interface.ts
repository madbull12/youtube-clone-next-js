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

export interface IVideo {
    id:{
        kind:string;
        videoId:string
    },
    kind:string;
    snippet:ISnippet;
}

export interface IResolution {
    height:number;
    url:string;
    width:string;
}

export interface IComment {
    id:string;
    kind:string;
    snippet: {
        topLevelComment:{
            id:string;
            kind:string;
            snippet:{
                authorChannelId:{
                    value:string;
                };
                authorChannelUrl:string;
                authorDisplayName:string;
                authorProfileImageUrl:string;
                likeCount:number;
                publishedAt:Date;
                textDisplay:string;
                videoId:string;

            }
        }
    }
}