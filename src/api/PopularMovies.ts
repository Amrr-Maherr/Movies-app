import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/movie/popular"
const apiKey = "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetPopularMovies = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}${apiEndPoint}`, {
            params: {
                api_key: apiKey,
                language: "en-US",
                page: 1,
                region: "US",
                include_adult: false,
                include_video: true
            }
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return null;
    }
};