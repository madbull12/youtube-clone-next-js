import axios from "axios";

export const youtubeSearch = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/search',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});
export const youtubeDetails = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/video/details',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});
export const youtubeRelated = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/video/related-contents',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});
export const youtubeChannelDetails = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/channel/details',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});

export const youtubeChannelVideos = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/channel/videos',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});
export const youtubeChannelChannels = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/channel/channels',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});
export const youtubeChannelPlaylists = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/channel/playlists',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});

export const youtubeAutoComplete = axios.create({
    baseURL: 'https://youtube138.p.rapidapi.com/auto-complete',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});

export const youtubeHomeData = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
})
export const youtubeTrending = axios.create({
    baseURL: 'https://youtube-v3-alternative.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
})



