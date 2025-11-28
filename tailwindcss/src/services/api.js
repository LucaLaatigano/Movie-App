const API_KEY = "5d67080b15e0429358742ad6892b67d2"
const BASE_URL = "https://api.themoviedb.org/3"


export const getPopularMovies = async ()=>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
}

export const searchMovie = async (query)=>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json();
    return data.results
}

export const movieDetails = async (movieId) =>{
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json();
    return data
}

export const movieCredits = async(movieId)=>{
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}