import axios from "axios";
import type { MovieDetails } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/movie/";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetMovieDetails = async (id: number): Promise<MovieDetails | null> => {
    try {
        const response = await axios.get(`${apiBaseUrl}${apiEndPoint}${id}`, {
            params: {
                api_key: apiKey,
                language: "en-US",
                include_adult: false,
                append_to_response: "credits,videos,images,reviews,similar,external_ids,keywords"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return null;
    }
};
