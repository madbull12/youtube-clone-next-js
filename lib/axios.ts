import axios from "axios";

const youtubeClient = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
    }
});

export default youtubeClient;