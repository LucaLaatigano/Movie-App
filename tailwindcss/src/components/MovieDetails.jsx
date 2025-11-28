import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import { movieDetails, movieCredits, searchMovie } from "../services/api";
import MoviesCard from "./MovieCard";
function MovieDetails(){
    const {id} = useParams();
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [relatedMovie, setRelatedMovie] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getMovieDetals = async ()=>{
        try{
            const result = await movieDetails(id)
            const resultCredits = await movieCredits(id)
            const relatedMovies = await searchMovie(result.title)
            setMovie(result)
            setCredits(resultCredits)
            const movieFiltered = relatedMovies.filter(prev => prev.id !== result.id)
            setRelatedMovie(movieFiltered)
        }catch(err){
            console.log(err)
            setError("We could not show the detail of your movie")
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getMovieDetals();
    },[id])

    {/*function that show the duration time of the movie in hrs min sec */}
    function formatRuntime(totalMinutes) {
        if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
            return ''; 
        }
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        let timeString = '';
        if (hours > 0) {
            timeString += `${hours}h `;
        }
        if (minutes > 0 || hours === 0) {
            timeString += `${minutes}m`;
        }

        return timeString.trim();
    }

    return(
        <div>
            {error && <p className="text-red-600 font-bold font-15"> {error}</p>}
            {loading ? (<p className="text-white font-bold font-15">Loading...</p>)
            : (
                movie && (
                    movie &&
                <div className="flex flex-col w-full">
                    <div className="flex w-screen h-100">
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                         alt="Movie Image" className="w-100 h-110 pt-5 pl-5 object-cover"/>
                         <div className="flex flex-col ml-5 mt-5 w-300">
                            <h2 className="text-white text-3xl text-start pl-3 font-bold">
                                {`${movie.title} (${movie.release_date.split("-")[0]})`}
                            </h2>
                            <span className="pl-4 mt-3 flex gap-2 font-medium text-white ">
                                · {movie.genres.map((genre)=>(
                                    <span className="text-white" key={genre.id}>{genre.name}</span>
                                ))} ·
                                <span className="text-white font-light">
                                    From {movie.origin_country[0]}
                                </span> 
                                ·
                                <span>
                                    {formatRuntime(movie.runtime)}
                                </span>
                            </span>
                            <div className="mt-15">
                                <h2 className="text-white text-3xl text-start pl-3 font-bold">
                                        General Preview
                                </h2>
                                <p className="text-white pl-3 mr-3">
                                    {movie.overview}
                                </p>
                            </div>
                            <div className="mt-15">
                                <h2 className="text-white pl-3 font-bold text-3xl">{credits.crew[0].name}</h2>
                                <span className="text-white pl-3 pt-2">
                                    · {credits.crew[0].job}
                                </span>
                            </div>
                         </div>
                    </div>
                    <div className="flex justify-start mt-10 ml-5 flex-col">
                        <h2 className="text-[25px] font-bold text-white">Cast</h2>
                        <div className="flex justify-start gap-5 ml-3 mt-5 flex-wrap">
                        {credits.cast.slice(0, 5).map((actor, index)=>(
                            <div key={index} className="flex flex-col justify-start items-center 
                             w-65 h-70 bg-gray-800">
                                <img src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                                alt="Movie Image" className="w-70 h-60 pb-5 object-cover"/>
                                <h3 className="text-white font-bold pb-5">
                                    {actor.name}
                                </h3>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="flex justify-start mt-10 ml-5 flex-col"> 
                        <h2 className="text-[25px] font-bold text-white">Related Movies</h2>
                        {/* Contenedor de las tarjetas de películas */}
                        <div className="flex gap-5 mt-5 flex-wrap ml-10 mb-20"> 
                            {relatedMovie.slice(0, 5).map((movieRe, indexI) => (
                                <MoviesCard json={movieRe} key={indexI}/>
                            ))}
                        </div>
                    </div>
                </div>
                )
            )}
        </div>
    )
}
export default MovieDetails;