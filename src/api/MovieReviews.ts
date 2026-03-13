import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface MovieReview {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface MovieReviewsResponse {
  id: number;
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch movie reviews from TMDB API
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Reviews response with pagination
 */
export const GetMovieReviews = async (id: number, page: number = 1): Promise<MovieReviewsResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/reviews`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return null;
  }
};
