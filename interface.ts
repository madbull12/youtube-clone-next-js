export interface ISnippet {
    channelId:string;
    channelTitle:string;
    description:string;
    publishTime:string;
    publishedAt:string;
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