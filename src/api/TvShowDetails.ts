import axios from "axios";
import type { TvShowDetails } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/tv/";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetTvShowDetails = async (id: number): Promise<TvShowDetails | null> => {
    try {
        const response = await axios.get(`${apiBaseUrl}${apiEndPoint}${id}`, {
            params: {
                api_key: apiKey,
                language: "en-US",
                include_adult: false,
                append_to_response: "credits,videos,images,reviews,similar,external_ids,keywords,watch/providers"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching TV show details:", error);
        return null;
    }
};
