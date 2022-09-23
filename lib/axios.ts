import axios from "axios";

const youtubeClient = axios.create({
    baseURL: 'https://youtube-v31.p.rapidapi.com/',
    headers: {
        Accept:"application/js"
    }
});

export default youtubeClient;