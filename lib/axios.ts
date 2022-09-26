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

